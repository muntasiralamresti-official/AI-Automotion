"""Two-Way Audio Intercom Service between Fleet HQ Control Room and Driver Cabin."""
import time
from typing import Dict, Any


class FleetIntercomService:
    def __init__(self):
        self.is_channel_open = False
        self.active_speaker = "STANDBY" # "CONTROL_ROOM", "DRIVER", "STANDBY"
        self.last_transmission_time = time.time()
        self.last_audio_message = "No active broadcasts."

    def start_control_broadcast(self, officer_name: str = "Safety Officer HQ") -> Dict[str, Any]:
        """Fleet dispatcher opens channel to speak through car speakers."""
        self.is_channel_open = True
        self.active_speaker = "CONTROL_ROOM"
        self.last_transmission_time = time.time()
        self.last_audio_message = f"🚨 HQ Priority Broadcast: {officer_name} on line."
        return {
            "status": "HQ_BROADCAST_ACTIVE",
            "officer": officer_name,
            "speaker": self.active_speaker,
            "timestamp": time.strftime("%H:%M:%S")
        }

    def stop_broadcast(self) -> Dict[str, Any]:
        """Closes channel."""
        self.is_channel_open = False
        self.active_speaker = "STANDBY"
        self.last_audio_message = "Channel Standby."
        return {"status": "STANDBY"}

    def get_status(self) -> Dict[str, Any]:
        return {
            "is_channel_open": self.is_channel_open,
            "active_speaker": self.active_speaker,
            "last_message": self.last_audio_message,
            "timestamp": time.strftime("%H:%M:%S")
        }


intercom_service = FleetIntercomService()
