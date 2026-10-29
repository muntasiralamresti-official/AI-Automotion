"""System configuration and operational settings for Zyncoo AI Sentinel."""
from pydantic import BaseModel, Field


class SystemSettings(BaseModel):
    # Camera settings
    camera_index: int = Field(default=0, description="Webcam device index")
    frame_width: int = Field(default=640, description="Video capture width")
    frame_height: int = Field(default=480, description="Video capture height")
    fps: int = Field(default=30, description="Target processing FPS")
    enable_night_vision: bool = Field(default=False, description="CLAHE Infrared night enhancement")

    # Dynamic Speed & Autonomous Throttle
    vehicle_speed_kmh: float = Field(default=65.0, description="Current simulated vehicle speed in km/h")
    dynamic_speed_adaptation: bool = Field(default=True, description="Tighter timeout at higher speeds")
    enable_auto_throttle: bool = Field(default=True, description="Autonomous deceleration during severe emergency")

    # Eye Aspect Ratio (EAR) settings
    ear_threshold: float = Field(default=0.22, description="EAR threshold below which eyes are closed")
    sleep_time_seconds: float = Field(default=3.0, description="Duration in seconds with closed eyes to trigger alarm")
    micro_sleep_seconds: float = Field(default=1.5, description="Duration in seconds to flag drowsiness warning")

    # Mouth Aspect Ratio (MAR) settings
    mar_threshold: float = Field(default=0.65, description="MAR threshold above which is considered a yawn")
    yawn_duration_seconds: float = Field(default=1.5, description="Consecutive seconds open to count as a yawn")

    # Distraction & In-Cabin AI
    distraction_timeout_seconds: float = Field(default=2.0, description="Seconds looking away/phone to trigger warning")
    enable_smoking_detection: bool = Field(default=True, description="Detect driver cigarette/vaping gestures")

    # Alcohol Breathalyzer & Face ID
    enable_alcohol_interlock: bool = Field(default=True, description="MQ-3 alcohol ignition lock")
    enable_face_id_auth: bool = Field(default=True, description="Biometric driver verification")

    # Head Pose settings
    pitch_down_threshold: float = Field(default=-15.0, description="Degrees pitched down to signal head nodding")

    # Alert / Sound & Voice settings
    enable_backend_buzzer: bool = Field(default=True, description="Enable local PC/Raspberry Pi audio alarm")
    buzzer_frequency_hz: int = Field(default=1800, description="Alarm siren frequency in Hz")
    buzzer_volume: float = Field(default=1.0, description="Alarm volume multiplier 0.0 - 1.0")
    enable_voice_alert: bool = Field(default=True, description="Enable Bengali / English Voice Warnings")
    voice_language: str = Field(default="bn-BD", description="bn-BD or en-US")


class AppState:
    """Global singleton state containing live config and runtime statistics."""
    def __init__(self):
        self.settings = SystemSettings()
        self.is_running = True
        self.total_blinks = 0
        self.total_yawns = 0
        self.alarm_trigger_count = 0
        self.distraction_count = 0
        self.smoking_count = 0
        self.trip_start_timestamp: float = 0.0

    def update_settings(self, new_settings: dict):
        current_dict = self.settings.model_dump()
        current_dict.update({k: v for k, v in new_settings.items() if v is not None})
        self.settings = SystemSettings(**current_dict)


app_state = AppState()
