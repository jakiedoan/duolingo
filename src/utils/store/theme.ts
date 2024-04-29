import { useEffect } from 'react';
import { StateCreator, create, createStore } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

export type ThemeState = {
  mode: 'light' | 'dark';
};

export type ThemeActions = {
  changeMode: (mode: 'light' | 'dark') => void;
};

export type ThemeStore = ThemeState & ThemeActions;

type Persist = (
  config: StateCreator<ThemeStore>,
  options: PersistOptions<ThemeStore>
) => StateCreator<ThemeStore>;

const defaultInitState: ThemeState = {
  mode: 'light',
};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    changeMode: (mode: 'light' | 'dark') =>
      set(() => ({
        mode: mode,
      })),
  }));
};

export const useThemeMode = create<ThemeStore>(
  (persist as Persist)(
    (set): ThemeStore => ({
      mode: 'light',
      changeMode: (mode: 'light' | 'dark') =>
        set(() => ({
          mode: mode,
        })),
    }),
    {
      name: 'theme', // name of the item in the storage (must be unique)
    }
  )
);
