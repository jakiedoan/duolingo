'use client';

import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { UserInfo } from '@/utils/types';

type UserState = {
  user: UserInfo | null;
};

type UserAction = {
  setUser: Dispatch<SetStateAction<UserInfo | null>>;
};

type UserStore = UserState & UserAction;

export interface UserStoreProviderProps {
  children: ReactNode;
  initialUser?: UserInfo | null;
}
const UserContext = createContext<UserStore>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({
  children,
  initialUser = null,
}: UserStoreProviderProps) => {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const sessionStoreContext = useContext(UserContext);

  if (!sessionStoreContext) {
    throw new Error(`useUser must be use within UserProvider`);
  }

  return sessionStoreContext;
};
