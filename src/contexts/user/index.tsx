import { deleteCookie, setCookie } from 'cookies-next';
import { type ReactNode, useContext, createContext, useReducer } from 'react';

type UserContextDispatch = { type: string; payload?: any };

interface UserContext {
  state: Record<string, unknown>;
  dispatch: ({ type, payload }: UserContextDispatch) => void;
}

const initialState = {
  email: null,
  uid: null,
};

const UserContext = createContext<UserContext>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (_: any, { type, payload }: UserContextDispatch) => {
  switch (type) {
    case 'LOGIN':
      setCookie('user', JSON.stringify(payload));
      return {
        email: payload.email,
        uid: payload.uid,
      };
    case 'LOGOUT':
      deleteCookie('user');
      return initialState;
  }
};

export default function UserContextProvider({
  children,
  defaultValue,
}: {
  children: ReactNode;
}) {
  const initialUser = defaultValue ? JSON.parse(defaultValue) : initialState;
  const [state, dispatch] = useReducer(reducer, initialUser);
  const value = { state, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);

  return context;
}
