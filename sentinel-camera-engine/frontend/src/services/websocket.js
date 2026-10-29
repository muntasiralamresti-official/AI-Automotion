/**
 * WebSocket manager with automatic reconnection for live driver telemetry.
 */
export class TelemetrySocket {
  constructor(url, onMessage, onStatusChange) {
    this.url = url;
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange;
    this.socket = null;
    this.reconnectTimer = null;
    this.isClosedManually = false;
  }

  connect() {
    this.isClosedManually = false;
    try {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        if (this.onStatusChange) this.onStatusChange(true);
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (this.onMessage) this.onMessage(data);
        } catch (err) {
          console.error('[WS] Parse error:', err);
        }
      };

      this.socket.onclose = () => {
        if (this.onStatusChange) this.onStatusChange(false);
        if (!this.isClosedManually) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = setTimeout(() => this.connect(), 2000);
        }
      };

      this.socket.onerror = () => {
        this.socket.close();
      };
    } catch (e) {
      if (!this.isClosedManually) {
        this.reconnectTimer = setTimeout(() => this.connect(), 2000);
      }
    }
  }

  disconnect() {
    this.isClosedManually = true;
    clearTimeout(this.reconnectTimer);
    if (this.socket) {
      this.socket.close();
    }
  }
}
