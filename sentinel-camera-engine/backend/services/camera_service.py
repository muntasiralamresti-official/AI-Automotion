"""Camera capture, FaceMesh inference, Blackbox stream, and Multi-Sensor HUD overlay."""
import cv2
import mediapipe as mp
import numpy as np
import time
from core.config import app_state
from detectors.ear import compute_eyes_aspect_ratio, LEFT_EYE_LANDMARKS, RIGHT_EYE_LANDMARKS
from detectors.mar import compute_mouth_aspect_ratio
from detectors.head_pose import estimate_head_pose
from detectors.gaze import evaluate_gaze_direction
from detectors.night_vision import night_enhancer
from detectors.smoking_detector import detect_smoking_gesture
from detectors.face_id_service import face_id_service
from detectors.drowsiness_engine import DrowsinessEngine
from services.audio_service import alarm_service
from services.blackbox_service import blackbox_recorder


class CameraService:
    def __init__(self):
        self.cap: cv2.VideoCapture | None = None
        self.engine = DrowsinessEngine()
        self.latest_telemetry: dict = {}
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.is_synthetic = False
        self._init_camera()

    def _init_camera(self):
        idx = app_state.settings.camera_index
        self.cap = cv2.VideoCapture(idx)
        if not self.cap or not self.cap.isOpened():
            self.is_synthetic = True
        else:
            self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, app_state.settings.frame_width)
            self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, app_state.settings.frame_height)
            self.is_synthetic = False

    def generate_synthetic_frame(self) -> np.ndarray:
        frame = np.zeros((480, 640, 3), dtype=np.uint8)
        frame[:] = (30, 25, 20)
        t = time.time()
        is_sleeping_sim = (int(t) % 12) >= 8
        eye_height = 2 if is_sleeping_sim else 14

        cv2.ellipse(frame, (320, 240), (120, 160), 0, 0, 360, (200, 180, 160), -1)
        cv2.ellipse(frame, (275, 210), (22, eye_height), 0, 0, 360, (50, 40, 30), -1)
        cv2.ellipse(frame, (365, 210), (22, eye_height), 0, 0, 360, (50, 40, 30), -1)
        cv2.ellipse(frame, (320, 310), (35, 10), 0, 0, 360, (80, 70, 120), -1)
        cv2.putText(frame, "[SIMULATOR MODE - NO WEBCAM DETECTED]", (50, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 200, 255), 2)
        return frame

    def process_frame(self) -> tuple[np.ndarray, dict]:
        frame = None
        if not self.is_synthetic and self.cap:
            ret, captured = self.cap.read()
            if ret and captured is not None:
                frame = cv2.flip(captured, 1)

        if frame is None:
            frame = self.generate_synthetic_frame()

        # Push raw frame to Blackbox rolling crash memory buffer
        blackbox_recorder.push_frame(frame)

        frame = night_enhancer.enhance_frame(frame, app_state.settings.enable_night_vision)
        h, w, _ = frame.shape
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)

        if results.multi_face_landmarks:
            raw_landmarks = results.multi_face_landmarks[0].landmark
            mesh_points = np.array([
                [int(pt.x * w), int(pt.y * h), pt.z] for pt in raw_landmarks
            ])

            ear_data = compute_eyes_aspect_ratio(mesh_points)
            mar_val = compute_mouth_aspect_ratio(mesh_points)
            head_pose = estimate_head_pose(mesh_points, w, h)
            gaze = evaluate_gaze_direction(mesh_points)
            smoking = detect_smoking_gesture(mesh_points, w, h)
            face_id_service.verify_driver(mesh_points)

            telemetry = self.engine.evaluate(ear_data, mar_val, head_pose, gaze, smoking)

            if telemetry["trigger_alarm"]:
                alarm_service.start_alarm()
            else:
                alarm_service.stop_alarm()

            self._draw_hud(frame, telemetry, mesh_points)
            self.latest_telemetry = telemetry
        else:
            telemetry = {
                "status": "NO_FACE_DETECTED",
                "risk_score": 0.0,
                "is_eyes_closed": False,
                "closed_seconds": 0.0,
                "sleep_threshold_sec": app_state.settings.sleep_time_seconds,
                "trigger_alarm": False,
                "gaze_direction": "UNKNOWN",
                "vehicle_speed": round(app_state.settings.vehicle_speed_kmh, 1),
                "driver_authorized": True,
                "driver_name": face_id_service.enrolled_driver_name,
                "is_auto_throttling": False,
                "alcohol_bac": 0.0,
                "ignition_locked": False,
                "hazard_lights": False,
                "haptic_vibration": False,
                "timestamp": time.time()
            }
            alarm_service.stop_alarm()
            cv2.putText(frame, "NO DRIVER FACE DETECTED", (30, 80),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            self.latest_telemetry = telemetry

        return frame, self.latest_telemetry

    def _draw_hud(self, frame: np.ndarray, telemetry: dict, mesh_points: np.ndarray):
        status = telemetry["status"]

        if status == "SLEEPING_ALARM":
            color = (0, 0, 255)
            cv2.rectangle(frame, (0, 0), (frame.shape[1], 70), (0, 0, 180), -1)
            cv2.putText(frame, "!!! ALARM: DRIVER SLEEPING - WAKE UP !!!", (20, 50),
                        cv2.FONT_HERSHEY_DUPLEX, 0.85, (255, 255, 255), 2)
        elif status == "SMOKING_WARNING":
            color = (0, 100, 255)
            cv2.putText(frame, "ALERT: SMOKING / VAPING PROHIBITED", (20, 45),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, color, 2)
        elif status == "DISTRACTION_WARNING":
            color = (0, 140, 255)
            cv2.putText(frame, "WARNING: PHONE / DISTRACTION DETECTED", (20, 45),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, color, 2)
        elif status == "DROWSY_WARNING":
            color = (0, 165, 255)
            cv2.putText(frame, "WARNING: DROWSINESS DETECTED", (20, 45),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.75, color, 2)
        else:
            color = (0, 255, 0)
            cv2.putText(frame, "STATUS: DRIVER ALERT (OK)", (20, 45),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

        left_eye_pts = mesh_points[LEFT_EYE_LANDMARKS, :2].astype(np.int32)
        right_eye_pts = mesh_points[RIGHT_EYE_LANDMARKS, :2].astype(np.int32)
        cv2.polylines(frame, [left_eye_pts], True, color, 1)
        cv2.polylines(frame, [right_eye_pts], True, color, 1)

        cv2.putText(frame, f"Driver: {telemetry.get('driver_name', 'Verified')}",
                    (20, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (200, 255, 200), 2)
        cv2.putText(frame, f"Speed: {telemetry.get('vehicle_speed', 0)} km/h | EAR: {telemetry.get('avg_ear', 0.0):.2f}",
                    (20, 115), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (255, 255, 255), 2)

        if telemetry.get("is_auto_throttling"):
            cv2.putText(frame, "[AUTO THROTTLE DECELERATING]", (20, 140),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 165, 255), 2)

    def get_stream_generator(self):
        while app_state.is_running:
            frame, _ = self.process_frame()
            ret, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
            if not ret:
                continue
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
            time.sleep(1.0 / app_state.settings.fps)


camera_service = CameraService()
