"""Core engine orchestrating EAR, MAR, Head Pose, Gaze, Smoking, Speed Throttle & Blackbox."""
import time
from typing import Dict, Any
from core.config import app_state
from services.fleet_service import fleet_service
from services.blackbox_service import blackbox_recorder
from services.vehicle_control_service import vehicle_controller
from detectors.face_id_service import face_id_service


class DrowsinessEngine:
    def __init__(self):
        self.eye_closed_start: float | None = None
        self.yawn_start: float | None = None
        self.distraction_start: float | None = None
        self.alarm_active: bool = False
        self.consecutive_closed_sec: float = 0.0
        self.yawn_duration_sec: float = 0.0
        self.distraction_duration_sec: float = 0.0
        self.blackbox_triggered_for_session = False

    def compute_dynamic_sleep_threshold(self) -> float:
        settings = app_state.settings
        base_threshold = settings.sleep_time_seconds
        if not settings.dynamic_speed_adaptation:
            return base_threshold

        speed = settings.vehicle_speed_kmh
        if speed >= 100.0:
            return max(1.8, base_threshold - 1.2)
        elif speed >= 60.0:
            return max(2.2, base_threshold - 0.8)
        elif speed < 10.0:
            return base_threshold + 1.0
        return base_threshold

    def evaluate(self, ear_data: dict, mar_val: float, head_pose: dict, gaze: dict, smoking: dict) -> Dict[str, Any]:
        current_time = time.time()
        settings = app_state.settings
        dynamic_threshold = self.compute_dynamic_sleep_threshold()

        # 1. Eye Closure Tracking
        avg_ear = ear_data.get("avg_ear", 0.0)
        is_eyes_closed = avg_ear < settings.ear_threshold
        if is_eyes_closed:
            if self.eye_closed_start is None:
                self.eye_closed_start = current_time
            self.consecutive_closed_sec = current_time - self.eye_closed_start
        else:
            if self.eye_closed_start is not None:
                if 0.1 <= (current_time - self.eye_closed_start) < settings.micro_sleep_seconds:
                    app_state.total_blinks += 1
            self.eye_closed_start = None
            self.consecutive_closed_sec = 0.0

        # 2. Yawn Tracking
        is_yawning = mar_val > settings.mar_threshold
        if is_yawning:
            if self.yawn_start is None:
                self.yawn_start = current_time
            self.yawn_duration_sec = current_time - self.yawn_start
            if self.yawn_duration_sec >= settings.yawn_duration_seconds:
                app_state.total_yawns += 1
                self.yawn_start = None
        else:
            self.yawn_start = None
            self.yawn_duration_sec = 0.0

        # 3. Gaze & Distraction Tracking
        is_distracted = gaze.get("is_distracted", False)
        if is_distracted:
            if self.distraction_start is None:
                self.distraction_start = current_time
            self.distraction_duration_sec = current_time - self.distraction_start
            if self.distraction_duration_sec >= settings.distraction_timeout_seconds:
                app_state.distraction_count += 1
        else:
            self.distraction_start = None
            self.distraction_duration_sec = 0.0

        # 4. Smoking Check
        is_smoking = smoking.get("is_smoking", False)
        if is_smoking:
            app_state.smoking_count += 1

        # 5. Head Nodding
        is_nodding = head_pose.get("is_nodding", False)

        # 6. Autonomous Speed Throttle Deceleration
        is_severe_sleep = self.consecutive_closed_sec >= dynamic_threshold
        if settings.enable_auto_throttle:
            new_speed = vehicle_controller.process_emergency_throttle(is_severe_sleep, settings.vehicle_speed_kmh)
            settings.vehicle_speed_kmh = new_speed

        # 7. Threat Score Calculation
        eye_risk = min(100.0, (self.consecutive_closed_sec / dynamic_threshold) * 85.0) if is_eyes_closed else 0.0
        yawn_risk = 20.0 if (self.yawn_duration_sec > 0.8) else 0.0
        nod_risk = 25.0 if is_nodding else 0.0
        distract_risk = 30.0 if (self.distraction_duration_sec > 1.5) else 0.0
        smoke_risk = 15.0 if is_smoking else 0.0
        total_risk = min(100.0, eye_risk + yawn_risk + nod_risk + distract_risk + smoke_risk)

        # 8. Status & Alert Triggers
        trigger_alarm = False
        status_text = "AWAKE"

        if is_severe_sleep:
            trigger_alarm = True
            status_text = "SLEEPING_ALARM"
            if not self.alarm_active:
                app_state.alarm_trigger_count += 1
            self.alarm_active = True

            # Prolonged closure (> 5s) -> Hazard Lights, Fleet SOS & Blackbox Lock
            if self.consecutive_closed_sec >= (dynamic_threshold + 2.0):
                fleet_service.update_hazard_status(True)
                if not fleet_service.sos_dispatched:
                    fleet_service.dispatch_emergency_sos("Driver Unresponsive", settings.vehicle_speed_kmh)
                if not self.blackbox_triggered_for_session:
                    blackbox_recorder.trigger_emergency_lock("Severe Driver Incapacitation")
                    self.blackbox_triggered_for_session = True
            fleet_service.trigger_haptic_vibration(True)

        elif is_smoking:
            status_text = "SMOKING_WARNING"
            self.alarm_active = False
        elif self.distraction_duration_sec >= settings.distraction_timeout_seconds:
            status_text = "DISTRACTION_WARNING"
            self.alarm_active = False
            fleet_service.trigger_haptic_vibration(True)
        elif self.consecutive_closed_sec >= settings.micro_sleep_seconds or is_nodding or (self.yawn_duration_sec > 1.0):
            status_text = "DROWSY_WARNING"
            self.alarm_active = False
            fleet_service.trigger_haptic_vibration(False)
        else:
            status_text = "AWAKE"
            self.alarm_active = False
            fleet_service.trigger_haptic_vibration(False)
            if not is_eyes_closed:
                fleet_service.update_hazard_status(False)
                self.blackbox_triggered_for_session = False

        return {
            "status": status_text,
            "risk_score": round(total_risk, 1),
            "is_eyes_closed": is_eyes_closed,
            "closed_seconds": round(self.consecutive_closed_sec, 2),
            "sleep_threshold_sec": round(dynamic_threshold, 1),
            "trigger_alarm": trigger_alarm,
            "is_yawning": is_yawning,
            "is_distracted": is_distracted,
            "is_smoking": is_smoking,
            "gaze_direction": gaze.get("direction", "FORWARD"),
            "distraction_seconds": round(self.distraction_duration_sec, 1),
            "is_nodding": is_nodding,
            "avg_ear": avg_ear,
            "mar": mar_val,
            "head_pitch": head_pose.get("pitch", 0.0),
            "vehicle_speed": round(settings.vehicle_speed_kmh, 1),
            "is_auto_throttling": vehicle_controller.is_auto_throttling,
            "alcohol_bac": vehicle_controller.alcohol_bac_percent,
            "ignition_locked": vehicle_controller.is_engine_ignition_locked,
            "driver_authorized": face_id_service.is_authorized,
            "driver_name": face_id_service.enrolled_driver_name,
            "hazard_lights": fleet_service.hazard_lights_active,
            "haptic_vibration": fleet_service.haptic_vibration_active,
            "sos_dispatched": fleet_service.sos_dispatched,
            "total_blinks": app_state.total_blinks,
            "total_yawns": app_state.total_yawns,
            "alarm_count": app_state.alarm_trigger_count,
            "distraction_count": app_state.distraction_count,
            "smoking_count": app_state.smoking_count,
            "timestamp": current_time
        }
