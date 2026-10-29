"""REST API routes for Zyncoo AI Driver Sentinel Enterprise Features."""
import time
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from core.config import app_state
from services.camera_service import camera_service
from services.audio_service import alarm_service
from services.fleet_service import fleet_service
from services.blackbox_service import blackbox_recorder
from services.vehicle_control_service import vehicle_controller
from services.intercom_service import intercom_service
from services.rest_stop_service import rest_stop_service
from detectors.face_id_service import face_id_service

router = APIRouter(prefix="/api")


@router.get("/settings")
def get_settings():
    return app_state.settings.model_dump()


@router.post("/settings")
def update_settings(new_settings: dict):
    app_state.update_settings(new_settings)
    return {"status": "success", "settings": app_state.settings.model_dump()}


@router.post("/speed")
def update_speed(payload: dict):
    speed = float(payload.get("speed_kmh", 60.0))
    app_state.update_settings({"vehicle_speed_kmh": speed})
    return {"status": "speed_updated", "speed_kmh": speed}


# --- Two-Way Intercom Endpoints ---
@router.post("/intercom/broadcast")
def intercom_broadcast(payload: dict):
    officer = payload.get("officer_name", "Fleet Safety Dispatcher")
    return intercom_service.start_control_broadcast(officer)


@router.post("/intercom/stop")
def intercom_stop():
    return intercom_service.stop_broadcast()


@router.get("/intercom/status")
def intercom_status():
    return intercom_service.get_status()


# --- Rest Stop & Fuel Hubs ---
@router.get("/rest_stops")
def get_rest_stops():
    fatigued = (camera_service.latest_telemetry.get("risk_score", 0) > 40)
    return {"stations": rest_stop_service.get_nearest_stops(fatigued)}


# --- Blackbox Crash Recorder ---
@router.post("/blackbox/trigger")
def trigger_blackbox(payload: dict):
    reason = payload.get("reason", "Manual Operator Trigger")
    return blackbox_recorder.trigger_emergency_lock(reason)


@router.get("/blackbox/recordings")
def get_blackbox_recordings():
    return {"recordings": blackbox_recorder.get_recordings()}


# --- MQ-3 Alcohol Breathalyzer & Interlock ---
@router.post("/alcohol/test")
def test_alcohol_reading(payload: dict):
    bac = float(payload.get("bac_percent", 0.0))
    return vehicle_controller.update_alcohol_reading(bac)


@router.post("/alcohol/reset")
def reset_alcohol():
    vehicle_controller.reset_interlock()
    return {"status": "interlock_reset"}


# --- Face ID Authentication ---
@router.get("/face_id/status")
def get_face_id_status():
    return {
        "is_authorized": face_id_service.is_authorized,
        "driver_name": face_id_service.enrolled_driver_name,
        "license": face_id_service.enrolled_driver_license,
        "similarity": face_id_service.auth_similarity_score
    }


# --- Common Relays ---
@router.post("/hazard/reset")
def reset_hazard():
    fleet_service.reset_emergency_state()
    return {"status": "emergency_reset"}


@router.get("/stats")
def get_stats():
    trip_duration = time.time() - app_state.trip_start_timestamp if app_state.trip_start_timestamp > 0 else 0
    return {
        "trip_duration_seconds": round(trip_duration, 1),
        "total_blinks": app_state.total_blinks,
        "total_yawns": app_state.total_yawns,
        "alarm_count": app_state.alarm_trigger_count,
        "distraction_count": app_state.distraction_count,
        "smoking_count": app_state.smoking_count,
        "latest_telemetry": camera_service.latest_telemetry
    }


@router.get("/video_feed")
def video_feed():
    return StreamingResponse(
        camera_service.get_stream_generator(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )
