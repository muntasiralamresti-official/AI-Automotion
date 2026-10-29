"""FastAPI application entry point for Zyncoo AI Driver Sentinel."""
import asyncio
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from core.config import app_state
from api.routes import router as api_router
from api.websocket import ws_manager, telemetry_broadcaster


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    app_state.trip_start_timestamp = time.time()
    task = asyncio.create_task(telemetry_broadcaster())
    print("[Zyncoo AI] Driver Sentinel Backend initialized and actively monitoring.")
    yield
    # Shutdown
    app_state.is_running = False
    task.cancel()
    print("[Zyncoo AI] Shutting down Driver Sentinel.")


app = FastAPI(
    title="Zyncoo AI - Driver Drowsiness Sentinel",
    description="Real-time Face, Eye, Yawn, and Head Pose Telemetry with Speaker Alarm",
    version="2.5.0",
    lifespan=lifespan
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
