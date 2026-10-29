"""Fleet telemetry, SOS dispatch, simulated GPS tracking, and Hazard relay service."""
import time
from typing import Dict, Any, List


class FleetSafetyService:
    def __init__(self):
        self.hazard_lights_active = False
        self.haptic_vibration_active = False
        self.sos_dispatched = False
        self.sos_history: List[Dict[str, Any]] = []
        # Simulated starting coordinates (Dhaka Expressway route)
        self.simulated_lat = 23.8103
        self.simulated_lng = 90.4125

    def update_hazard_status(self, is_emergency: bool):
        """Activates hazard relay if driver remains asleep beyond critical duration."""
        self.hazard_lights_active = is_emergency

    def trigger_haptic_vibration(self, enable: bool):
        """Triggers steering wheel or seat vibration motor."""
        self.haptic_vibration_active = enable

    def dispatch_emergency_sos(self, reason: str, speed_kmh: float) -> Dict[str, Any]:
        """Dispatches automated distress alert to fleet manager and family contact."""
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        sos_packet = {
            "sos_id": f"SOS-{int(time.time())}",
            "timestamp": timestamp,
            "reason": reason,
            "vehicle_speed": f"{speed_kmh} km/h",
            "gps_coordinates": {
                "latitude": round(self.simulated_lat, 4),
                "longitude": round(self.simulated_lng, 4)
            },
            "status": "SENT_TO_FLEET_HQ"
        }
        self.sos_dispatched = True
        self.sos_history.insert(0, sos_packet)
        if len(self.sos_history) > 20:
            self.sos_history.pop()
        return sos_packet

    def reset_emergency_state(self):
        self.hazard_lights_active = False
        self.haptic_vibration_active = False
        self.sos_dispatched = False


fleet_service = FleetSafetyService()
