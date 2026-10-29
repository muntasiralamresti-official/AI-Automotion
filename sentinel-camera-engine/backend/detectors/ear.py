"""Eye Aspect Ratio (EAR) calculation and eye openness evaluator."""
import numpy as np
from scipy.spatial import distance as dist

# MediaPipe 468/478 Landmark Indices for Left and Right Eyes
# Format: [OuterCorner, Upper1, Upper2, InnerCorner, Lower2, Lower1]
LEFT_EYE_LANDMARKS = [362, 385, 387, 263, 373, 380]
RIGHT_EYE_LANDMARKS = [33, 160, 158, 133, 153, 144]

# Additional iris landmarks for gaze focus (optional refinement)
LEFT_IRIS = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]


def calculate_single_ear(landmarks_subset: np.ndarray) -> float:
    """Calculates EAR for 6 points around an eye.
    
    Formula: EAR = (||p1 - p5|| + ||p2 - p4||) / (2.0 * ||p0 - p3||)
    """
    try:
        # Vertical distances
        v1 = dist.euclidean(landmarks_subset[1], landmarks_subset[5])
        v2 = dist.euclidean(landmarks_subset[2], landmarks_subset[4])
        # Horizontal distance
        h = dist.euclidean(landmarks_subset[0], landmarks_subset[3])

        if h <= 1e-6:
            return 0.0

        ear = (v1 + v2) / (2.0 * h)
        return float(ear)
    except Exception:
        return 0.0


def compute_eyes_aspect_ratio(all_landmarks: np.ndarray) -> dict:
    """Extracts eye points and calculates left, right, and average EAR."""
    left_points = all_landmarks[LEFT_EYE_LANDMARKS]
    right_points = all_landmarks[RIGHT_EYE_LANDMARKS]

    left_ear = calculate_single_ear(left_points)
    right_ear = calculate_single_ear(right_points)
    avg_ear = (left_ear + right_ear) / 2.0

    return {
        "left_ear": round(left_ear, 3),
        "right_ear": round(right_ear, 3),
        "avg_ear": round(avg_ear, 3),
        "left_points": left_points.tolist(),
        "right_points": right_points.tolist()
    }
