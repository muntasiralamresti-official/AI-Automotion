"""Gaze tracking and driver distraction detection (phone usage, looking away)."""
import numpy as np
from scipy.spatial import distance as dist

# MediaPipe Iris landmark indices (requires refine_landmarks=True)
LEFT_IRIS_CENTER = 468
RIGHT_IRIS_CENTER = 473

# Eye corners for reference
LEFT_INNER = 362
LEFT_OUTER = 263
RIGHT_INNER = 133
RIGHT_OUTER = 33

# Eyelid vertical bounds for vertical gaze (looking down at phone)
LEFT_UPPER = 386
LEFT_LOWER = 374
RIGHT_UPPER = 159
RIGHT_LOWER = 145


def evaluate_gaze_direction(all_landmarks: np.ndarray) -> dict:
    """Calculates horizontal and vertical iris position ratios within the eye socket."""
    try:
        if len(all_landmarks) < 478:
            return {"direction": "FORWARD", "is_distracted": False, "ratio_x": 0.5, "ratio_y": 0.5}

        # 1. Left eye horizontal iris ratio
        l_iris = all_landmarks[LEFT_IRIS_CENTER][:2]
        l_in = all_landmarks[LEFT_INNER][:2]
        l_out = all_landmarks[LEFT_OUTER][:2]
        l_horiz_total = dist.euclidean(l_in, l_out)
        l_ratio_x = dist.euclidean(l_iris, l_out) / max(1e-6, l_horiz_total)

        # 2. Left eye vertical iris ratio (0 = top, 1 = bottom / looking down)
        l_up = all_landmarks[LEFT_UPPER][:2]
        l_down = all_landmarks[LEFT_LOWER][:2]
        l_vert_total = dist.euclidean(l_up, l_down)
        l_ratio_y = dist.euclidean(l_iris, l_up) / max(1e-6, l_vert_total)

        # Classify gaze direction
        direction = "FORWARD"
        is_distracted = False

        if l_ratio_y > 0.70:
            direction = "LOOKING_DOWN_PHONE"
            is_distracted = True
        elif l_ratio_x < 0.35:
            direction = "LOOKING_RIGHT"
            is_distracted = True
        elif l_ratio_x > 0.68:
            direction = "LOOKING_LEFT"
            is_distracted = True

        return {
            "direction": direction,
            "is_distracted": is_distracted,
            "ratio_x": round(float(l_ratio_x), 2),
            "ratio_y": round(float(l_ratio_y), 2)
        }
    except Exception:
        return {"direction": "FORWARD", "is_distracted": False, "ratio_x": 0.5, "ratio_y": 0.5}
