"""Audio Alarm Service for sounding the alarm through connected speakers."""
import sys
import threading
import time
from core.config import app_state


class AudioAlarmService:
    def __init__(self):
        self._is_playing = False
        self._thread: threading.Thread | None = None
        self._lock = threading.Lock()

    def start_alarm(self):
        """Triggers the continuous speaker siren in a background daemon thread."""
        with self._lock:
            if self._is_playing:
                return
            self._is_playing = True
            self._thread = threading.Thread(target=self._play_siren_loop, daemon=True)
            self._thread.start()

    def stop_alarm(self):
        """Silences the alarm."""
        with self._lock:
            self._is_playing = False

    def _play_siren_loop(self):
        """Alternates dual frequencies to sound an urgent driver wake-up alert."""
        freq_high = app_state.settings.buzzer_frequency_hz
        freq_low = int(freq_high * 0.75)

        while self._is_playing and app_state.settings.enable_backend_buzzer:
            try:
                if sys.platform == "win32":
                    import winsound
                    # High tone
                    winsound.Beep(freq_high, 200)
                    if not self._is_playing:
                        break
                    # Low tone
                    winsound.Beep(freq_low, 200)
                else:
                    # ANSI bell or terminal sound for Linux / Raspberry Pi
                    sys.stdout.write('\a')
                    sys.stdout.flush()
                    time.sleep(0.3)
            except Exception:
                time.sleep(0.3)


alarm_service = AudioAlarmService()
