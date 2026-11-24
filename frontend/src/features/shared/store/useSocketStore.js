import { create } from 'zustand';

export const useSocketStore = create((set) => ({
  socket: null,
  connected: false,
  error: null,

  setSocket: (socket) => set({ socket }),
  setConnected: (connected) => set({ connected }),
  setError: (error) => set({ error }),
}));
