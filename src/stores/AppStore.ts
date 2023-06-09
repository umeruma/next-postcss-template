import { create } from 'zustand'

interface AppState {
  isDarkMode: boolean;
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
}));