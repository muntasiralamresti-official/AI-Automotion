"""Mouth Aspect Ratio (MAR) computation for driver yawn detection."""
import numpy as np
from scipy.spatial import distance as dist

# MediaPipe Landmark Indices for Outer / Inner Lips
# 61: Left mouth corner, 291: Right mouth corner
# Top lip points: 39, 0, 269
# Bottom lip points: 181, 17, 405
MOUTH_VERTICAL_TOP = [39, 0, 269]
MOUTH_VERTICAL_BOTTOM = [181, 17, 405]
MOUTH_CORNERS = [61, 291]


def compute_mouth_aspect_ratio(all_landmarks: np.ndarray) -> float:
    """Calculates MAR to detect driver yawning.
    
    Formula: MAR = (sum of vertical lip distances) / (2.0 * corner distance)
    """
    try:
        corner_left = all_landmarks[MOUTH_CORNERS[0]]
        corner_right = all_landmarks[MOUTH_CORNERS[1]]

        horizontal = dist.euclidean(corner_left, corner_right)
        if horizontal <= 1e-6:
            return 0.0

        v1 = dist.euclidean(all_landmarks[MOUTH_VERTICAL_TOP[0]], all_landmarks[MOUTH_VERTICAL_BOTTOM[0]])
        v2 = dist.euclidean(all_landmarks[MOUTH_VERTICAL_TOP[1]], all_landmarks[MOUTH_VERTICAL_BOTTOM[1]])
        v3 = dist.euclidean(all_landmarks[MOUTH_VERTICAL_TOP[2]], all_landmarks[MOUTH_VERTICAL_BOTTOM[2]])

        mar = (v1 + v2 + v3) / (2.0 * horizontal)
        return float(round(mar, 3))
    except Exception:
        return 0.0
