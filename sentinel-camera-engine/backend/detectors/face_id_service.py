"""Driver Face ID enrollment, authentication, and fleet time-card logging."""
import time
import numpy as np
from typing import Dict, Any, Optional

# Key structural facial landmarks for geometric signature (eyes, nose bridge, chin, cheekbones)
KEY_FACIAL_IDS = [1, 33, 61, 199, 263, 291, 10, 152, 234, 454]


class FaceIDAuthService:
    def __init__(self):
        self.enrolled_signature: Optional[np.ndarray] = None
        self.enrolled_driver_name = "Karim Uddin (ID #8492)"
        self.enrolled_driver_license = "DL-DHAKA-2024-912"
        self.is_authorized = True
        self.last_auth_time = time.time()
        self.auth_similarity_score = 0.96

    def compute_face_signature(self, mesh_points: np.ndarray) -> np.ndarray:
        """Extracts scale-normalized pairwise geometric vector from key landmarks."""
        pts = mesh_points[KEY_FACIAL_IDS, :2]
        center = np.mean(pts, axis=0)
        norm_pts = pts - center
        scale = np.linalg.norm(norm_pts)
        if scale > 1e-6:
            norm_pts = norm_pts / scale
        return norm_pts.flatten()

    def enroll_driver(self, mesh_points: np.ndarray, driver_name: str, license_no: str) -> dict:
        self.enrolled_signature = self.compute_face_signature(mesh_points)
        self.enrolled_driver_name = driver_name
        self.enrolled_driver_license = license_no
        self.is_authorized = True
        self.last_auth_time = time.time()
        return {
            "status": "ENROLLED_SUCCESS",
            "driver_name": driver_name,
            "license": license_no,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

    def verify_driver(self, mesh_points: np.ndarray) -> Dict[str, Any]:
        """Compares live driver against enrolled biometric signature."""
        if self.enrolled_signature is None:
            # Self-enroll first detected driver for prototype
            self.enrolled_signature = self.compute_face_signature(mesh_points)

        current_sig = self.compute_face_signature(mesh_points)
        dot_sim = np.dot(self.enrolled_signature, current_sig) / (
            np.linalg.norm(self.enrolled_signature) * np.linalg.norm(current_sig) + 1e-6
        )
        similarity = float(np.clip(dot_sim, 0.0, 1.0))
        self.auth_similarity_score = round(similarity, 3)

        # Threshold: 0.82
        self.is_authorized = similarity >= 0.82

        return {
            "is_authorized": self.is_authorized,
            "similarity": self.auth_similarity_score,
            "driver_name": self.enrolled_driver_name if self.is_authorized else "UNAUTHORIZED INTRUDER",
            "license": self.enrolled_driver_license if self.is_authorized else "UNKNOWN",
            "last_check": time.strftime("%H:%M:%S")
        }


face_id_service = FaceIDAuthService()
