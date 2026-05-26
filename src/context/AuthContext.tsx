/* eslint-disable react-refresh/only-export-components */
import { authService, type User } from '@/services/authService';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const user = await authService.getProfile();
      setUser(user);
    } catch (error: unknown) {
      console.error(error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const user = await authService.getProfile();
        if (isMounted) {
          setUser(user);
        }
      } catch (error: unknown) {
        console.error(error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        checkAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used whithin AuthProvider');
  }
  return context;
}
