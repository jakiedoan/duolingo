'use client'

import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

type SessionState = {
  token: string;
};

type SessionActions = {
  setToken: (token: string) => any;
};

type SessionStore = SessionState & SessionActions;

export interface SessionStoreProviderProps {
  children: ReactNode;
  initialToken?: string;
}
const SessionContext = createContext<SessionStore>({
  token: '',
  setToken: (token: string) => {},
});

export const SessionProvider = ({
  children,
  initialToken = '',
}: SessionStoreProviderProps) => {
  const [token, setToken] = useState(initialToken);

  return (
    <SessionContext.Provider value={{ token, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const sessionStoreContext = useContext(SessionContext);

  if (!sessionStoreContext) {
    throw new Error(`useSession must be use within SessionProvider`);
  }

  return sessionStoreContext;
};
