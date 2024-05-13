'use client';

import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';
import { UserInfo } from '@/utils/types';

type UserStore = {
  user: UserInfo | null;
  setUser: Dispatch<SetStateAction<UserInfo | null>>;
};

type Props = {
  children: ReactNode;
  initialUser?: UserInfo | null;
};

const UserContext = createContext<UserStore>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children, initialUser = null }: Props) => {
  const [user, setUser] = useState<UserInfo | null>(initialUser);

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
