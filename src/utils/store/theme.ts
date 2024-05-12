import { StateCreator, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

type ThemeState = {
  mode: 'light' | 'dark';
};

type ThemeActions = {
  changeMode: (mode: 'light' | 'dark') => void;
};

type ThemeStore = ThemeState & ThemeActions;

type Persist = (
  config: StateCreator<ThemeStore>,
  options: PersistOptions<ThemeStore>
) => StateCreator<ThemeStore>;

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
