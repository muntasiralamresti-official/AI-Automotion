"""Vehicle Control Relay: Autonomous Throttle Deceleration & MQ-3 Alcohol Interlock."""
import time
from typing import Dict, Any


class VehicleControlService:
    def __init__(self):
        # 1. Autonomous Speed Throttle Decelerator
        self.is_auto_throttling = False
        self.throttled_speed_limit = 120.0
        self.min_emergency_speed = 10.0 # Slow crawl for road shoulder pull-over

        # 2. MQ-3 Alcohol Breathalyzer
        self.alcohol_bac_percent = 0.00 # Blood Alcohol Content (0.00% is clean)
        self.alcohol_threshold_percent = 0.04 # Standard legal intoxication limit
        self.is_engine_ignition_locked = False
        self.last_breath_test_time = time.time()

    def process_emergency_throttle(self, is_severe_drowsy: bool, current_speed: float) -> float:
        """Gradually reduces speed if driver is incapacitated."""
        if is_severe_drowsy:
            self.is_auto_throttling = True
            # Decelerate smoothly
            new_speed = max(self.min_emergency_speed, current_speed - 4.5)
            return round(new_speed, 1)
        else:
            self.is_auto_throttling = False
            return current_speed

    def update_alcohol_reading(self, bac_value: float) -> Dict[str, Any]:
        """Processes breathalyzer blow sensor reading."""
        self.alcohol_bac_percent = round(float(bac_value), 3)
        self.last_breath_test_time = time.time()

        if self.alcohol_bac_percent >= self.alcohol_threshold_percent:
            self.is_engine_ignition_locked = True
            status = "ALCOHOL_DETECTED_IGNITION_LOCKED"
        else:
            self.is_engine_ignition_locked = False
            status = "PASS_CLEAN"

        return {
            "status": status,
            "bac_percent": self.alcohol_bac_percent,
            "ignition_locked": self.is_engine_ignition_locked,
            "threshold": self.alcohol_threshold_percent,
            "timestamp": time.strftime("%H:%M:%S")
        }

    def reset_interlock(self):
        self.is_engine_ignition_locked = False
        self.alcohol_bac_percent = 0.00


vehicle_controller = VehicleControlService()
