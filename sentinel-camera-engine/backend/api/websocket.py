"""WebSocket connection manager for real-time telemetry streaming."""
import asyncio
from typing import List
from fastapi import WebSocket, WebSocketDisconnect
from services.camera_service import camera_service


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in list(self.active_connections):
            try:
                await connection.send_json(message)
            except Exception:
                self.disconnect(connection)


ws_manager = ConnectionManager()


async def telemetry_broadcaster():
    """Background task sending live driver metrics to web dashboard."""
    while True:
        if ws_manager.active_connections:
            data = camera_service.latest_telemetry
            if data:
                await ws_manager.broadcast(data)
        await asyncio.sleep(0.05) # ~20Hz update rate
