import { io } from 'socket.io-client';

let socket = null;

export function initSocket(token) {
  if (socket) return socket;
  const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
  socket = io(baseURL, {
    autoConnect: false,
    transports: ['websocket'],
    auth: { token },
  });
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
