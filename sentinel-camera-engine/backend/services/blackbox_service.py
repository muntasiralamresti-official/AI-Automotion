"""Blackbox Rolling Crash & Severe Event Video Recorder."""
import os
import time
import cv2
import threading
from collections import deque
from typing import List, Dict, Any


class BlackboxCrashRecorder:
    def __init__(self, buffer_seconds: int = 30, fps: int = 15):
        self.buffer_seconds = buffer_seconds
        self.fps = fps
        self.max_frames = buffer_seconds * fps
        self.frame_buffer = deque(maxlen=self.max_frames)
        self.is_recording = True
        self.lock = threading.Lock()
        self.output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "recordings")
        os.makedirs(self.output_dir, exist_ok=True)
        self.saved_clips: List[Dict[str, Any]] = []

    def push_frame(self, frame):
        """Pushes current video frame into the rolling in-memory buffer."""
        if not self.is_recording or frame is None:
            return
        with self.lock:
            # Downscale slightly for storage efficiency: 480x360
            small = cv2.resize(frame, (480, 360))
            self.frame_buffer.append((time.time(), small))

    def trigger_emergency_lock(self, reason: str = "Severe Drowsiness Crash Event") -> Dict[str, Any]:
        """Locks the current 30-second buffer and saves it as a permanent incident clip."""
        with self.lock:
            if len(self.frame_buffer) < 10:
                return {"status": "BUFFER_TOO_SHORT", "reason": reason}

            frames_snapshot = list(self.frame_buffer)

        # Write to disk in a worker thread so it doesn't block video processing
        filename = f"CRASH_LOCK_{int(time.time())}.mp4"
        filepath = os.path.join(self.output_dir, filename)

        thread = threading.Thread(
            target=self._write_video_file,
            args=(filepath, frames_snapshot, reason, filename),
            daemon=True
        )
        thread.start()

        return {
            "status": "INCIDENT_SAVED",
            "filename": filename,
            "reason": reason,
            "duration_sec": len(frames_snapshot) / self.fps,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

    def _write_video_file(self, filepath: str, frames: list, reason: str, filename: str):
        try:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(filepath, fourcc, self.fps, (480, 360))
            for _, img in frames:
                out.write(img)
            out.release()

            record = {
                "filename": filename,
                "filepath": filepath,
                "reason": reason,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                "size_mb": round(os.path.getsize(filepath) / (1024 * 1024), 2)
            }
            self.saved_clips.insert(0, record)
            if len(self.saved_clips) > 20:
                self.saved_clips.pop()
        except Exception as e:
            print("[BlackboxRecorder] Write error:", e)

    def get_recordings(self) -> List[Dict[str, Any]]:
        return self.saved_clips


blackbox_recorder = BlackboxCrashRecorder()
