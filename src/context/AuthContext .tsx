import { createContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction = { type: 'login'; payload: User } | { type: 'logout' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

type AuthContextType = AuthState & {
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (userData: User) => {
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    dispatch({ type: 'login', payload: userData });
  };

  const logout = () => {
    Cookies.remove('user');
    dispatch({ type: 'logout' });
  };

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      dispatch({ type: 'login', payload: userData });
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
