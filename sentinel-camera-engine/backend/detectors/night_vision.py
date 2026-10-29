"""Night vision enhancement and sunglasses occlusion detector."""
import cv2
import numpy as np


class NightVisionEnhancer:
    def __init__(self):
        # CLAHE (Contrast Limited Adaptive Histogram Equalization)
        self.clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))

    def enhance_frame(self, bgr_frame: np.ndarray, is_enabled: bool) -> np.ndarray:
        """Applies adaptive histogram equalization to enhance low-light cabin visibility."""
        if not is_enabled:
            return bgr_frame

        # Convert to YUV and equalize luminance channel
        yuv = cv2.cvtColor(bgr_frame, cv2.COLOR_BGR2YUV)
        yuv[:, :, 0] = self.clahe.apply(yuv[:, :, 0])
        enhanced = cv2.cvtColor(yuv, cv2.COLOR_YUV2BGR)

        # Apply mild green/monochrome IR camera tint
        ir_tint = enhanced.copy()
        ir_tint[:, :, 0] = cv2.addWeighted(ir_tint[:, :, 0], 0.7, ir_tint[:, :, 1], 0.3, 0)
        ir_tint[:, :, 2] = cv2.addWeighted(ir_tint[:, :, 2], 0.6, ir_tint[:, :, 1], 0.4, 0)
        return ir_tint


def check_sunglasses_mode(avg_ear: float, eye_contrast: float) -> bool:
    """Heuristic check: if eye region has extremely low variation/contrast, sunglasses likely worn."""
    # When sunglasses are worn, EAR might read near 0 continuously while face and head are upright
    return eye_contrast < 12.0


night_enhancer = NightVisionEnhancer()
