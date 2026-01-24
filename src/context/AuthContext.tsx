import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../services/api';
import { getCurrentUser, login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时检查登录状态
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = localStorage.getItem('atoms_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const result = await getCurrentUser();
      if (result.success && result.data?.user) {
        setUser(result.data.user);
      } else {
        localStorage.removeItem('atoms_token');
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await apiLogin(email, password);
      if (result.success && result.data?.user) {
        setUser(result.data.user);
        return { success: true };
      }
      return { success: false, error: result.error?.message || '登录失败' };
    } catch (error) {
      return { success: false, error: '登录失败，请稍后重试' };
    }
  }

  async function register(email: string, username: string, password: string) {
    try {
      const result = await apiRegister(email, username, password);
      if (result.success && result.data?.user) {
        setUser(result.data.user);
        return { success: true };
      }
      return { success: false, error: result.error?.message || '注册失败' };
    } catch (error) {
      return { success: false, error: '注册失败，请稍后重试' };
    }
  }

  function logout() {
    apiLogout();
    setUser(null);
  }

  async function refreshUser() {
    await checkAuth();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
