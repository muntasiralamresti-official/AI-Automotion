"""Head Pose Estimation using OpenCV solvePnP to detect nodding or distraction."""
import cv2
import numpy as np

# Generic 3D model points of a human face
FACE_3D_MODEL = np.array([
    (0.0, 0.0, 0.0),          # Nose tip
    (0.0, -330.0, -65.0),     # Chin
    (-225.0, 170.0, -135.0),  # Left eye left corner
    (225.0, 170.0, -135.0),   # Right eye right corner
    (-150.0, -150.0, -125.0), # Left Mouth corner
    (150.0, -150.0, -125.0)   # Right mouth corner
], dtype=np.float64)

# Corresponding MediaPipe landmark indices
LANDMARK_INDICES = [1, 199, 33, 263, 61, 291]


def estimate_head_pose(all_landmarks: np.ndarray, image_width: int, image_height: int) -> dict:
    """Estimates Euler angles: Pitch (nod up/down), Yaw (turn left/right), Roll (tilt)."""
    try:
        image_points = np.array([
            all_landmarks[idx][:2] for idx in LANDMARK_INDICES
        ], dtype=np.float64)

        # Camera calibration matrix estimation
        focal_length = image_width
        center = (image_width / 2.0, image_height / 2.0)
        camera_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1]
        ], dtype=np.float64)
        dist_coeffs = np.zeros((4, 1))

        # Solve Perspective-n-Point
        success, rvec, tvec = cv2.solvePnP(
            FACE_3D_MODEL, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE
        )
        if not success:
            return {"pitch": 0.0, "yaw": 0.0, "roll": 0.0, "is_nodding": False}

        rmat, _ = cv2.Rodrigues(rvec)
        angles, _, _, _, _, _ = cv2.RQDecomp3x3(rmat)

        # Convert to degrees
        pitch = float(angles[0] * 360)
        yaw = float(angles[1] * 360)
        roll = float(angles[2] * 360)

        # A driver nodding forward has negative pitch
        is_nodding = pitch < -15.0 or pitch > 25.0

        return {
            "pitch": round(pitch, 1),
            "yaw": round(yaw, 1),
            "roll": round(roll, 1),
            "is_nodding": is_nodding
        }
    except Exception:
        return {"pitch": 0.0, "yaw": 0.0, "roll": 0.0, "is_nodding": False}
