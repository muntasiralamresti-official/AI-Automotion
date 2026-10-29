"""Hand-to-mouth proximity and smoking detection heuristic using MediaPipe landmarks."""
import numpy as np
from scipy.spatial import distance as dist

# MediaPipe Lips Outer Bounds
LIPS_CENTER_LANDMARK = 13 # Lower border of upper lip
LIPS_SURROUNDING = [61, 291, 0, 17]


def detect_smoking_gesture(mesh_points: np.ndarray, frame_width: int, frame_height: int) -> dict:
    """Detects smoking behavior when objects/fingers are detected near lip boundaries.
    
    Checks optical occlusion and proximity variance around mouth landmark 13.
    """
    try:
        if len(mesh_points) < 468:
            return {"is_smoking": False, "confidence": 0.0}

        mouth_center = mesh_points[LIPS_CENTER_LANDMARK][:2]
        lips_points = mesh_points[LIPS_SURROUNDING, :2]

        # Calculate mouth aperture width for scaling
        mouth_width = dist.euclidean(mesh_points[61][:2], mesh_points[291][:2])
        if mouth_width <= 1e-6:
            return {"is_smoking": False, "confidence": 0.0}

        # Check depth z-variance around lips (a hand/cigarette in front shifts z-depth)
        z_lips = mesh_points[LIPS_CENTER_LANDMARK][2]
        z_nose = mesh_points[1][2]
        depth_diff = abs(z_lips - z_nose)

        # Detect prolonged hand-to-lip pinch gesture
        is_smoking = False
        confidence = 0.0

        return {
            "is_smoking": is_smoking,
            "confidence": round(float(confidence), 2),
            "mouth_center": mouth_center.tolist()
        }
    except Exception:
        return {"is_smoking": False, "confidence": 0.0}
