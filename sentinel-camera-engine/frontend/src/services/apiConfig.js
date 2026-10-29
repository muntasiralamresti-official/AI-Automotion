/**
 * Resolves API base URLs and WebSockets dynamically for both Desktop and Mobile devices.
 */
export const getApiUrl = (endpoint) => {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  // Direct connect to backend host (supports mobile over local Wi-Fi or proxy)
  const host = window.location.hostname || 'localhost';
  return `http://${host}:8000${clean}`;
};

export const getWebSocketUrl = (endpoint = '/ws/telemetry') => {
  const host = window.location.hostname || 'localhost';
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `ws://${host}:8000${clean}`;
};
