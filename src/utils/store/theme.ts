import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeMode = create(
  persist(
    (set: any, get: any) => ({
      mode: 'light',
      setMode: () =>
        set((state: any) => ({
          ...state,
          mode: get().mode === 'dark' ? 'light' : 'dark',
        })),
    }),
    {
      name: 'theme', // name of the item in the storage (must be unique)
    }
  )
);
