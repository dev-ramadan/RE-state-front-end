import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { sessinToken, Profile } from '../types/User';
import { setAuthToken } from '../utils/request';
import {jwtDecode} from 'jwt-decode';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  roles: string[];
  user: Profile | null;
  isLoading: boolean;
  login: (data: sessinToken) => void;
  logout: () => void;
  setUser: (user: Profile | null) => void;
}

const COOKIE_NAME = 'Authentication';
const COOKIE_EXPIRES = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours

const AuthContext = createContext<AuthContextType | null>(null);

function initializeAuthState(): sessinToken | null {
  const cookie = Cookies.get(COOKIE_NAME);
  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie);
    return {
      jwtToken: parsed.jwtToken,
      roles: Array.isArray(parsed.roles) ? parsed.roles : [],
      user: parsed.user || null,
    };
  } catch (error) {
    console.error('Failed to parse auth cookie', error);
    return null;
  }
}

function isTokenExpired(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUserState] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from cookie
  useEffect(() => {
    const data = initializeAuthState();
    if (data) {
      if (isTokenExpired(data.jwtToken)) {
        // لو انتهى التوكن سجل خروج
        toast.error("Login agine")
        logout();
      } else {
        setToken(data.jwtToken);
        setRoles(data.roles);
        setUserState(data.user);
        setAuthToken(data.jwtToken); 
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((data: sessinToken) => {
    const formattedToken = data.jwtToken.startsWith('Bearer ')
      ? data.jwtToken
      : `Bearer ${data.jwtToken}`;

    setToken(formattedToken);
    setRoles(Array.isArray(data.roles) ? data.roles : []);
    setUserState(data.user);

    setAuthToken(formattedToken); 

    Cookies.set(
      COOKIE_NAME,
      JSON.stringify({
        jwtToken: formattedToken,
        roles: data.roles,
        user: data.user,
      }),
      {
        expires: COOKIE_EXPIRES,
        secure: window.location.protocol === 'https:',
        sameSite: 'Strict',
      }
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRoles([]);
    setUserState(null);
    setAuthToken(''); 
    Cookies.remove(COOKIE_NAME);
    window.location.href = '/login';
  }, []);

  const setUser = useCallback(
    (userData: Profile | null) => {
      setUserState(userData);
      const cookie = Cookies.get(COOKIE_NAME);
      const current = cookie ? JSON.parse(cookie) : { jwtToken: token, roles, user: null };
      current.user = userData;

      Cookies.set(COOKIE_NAME, JSON.stringify(current), {
        expires: COOKIE_EXPIRES,
        secure: window.location.protocol === 'https:',
        sameSite: 'Strict',
      });
    },
    [roles, token]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 60 * 1000); // تحقق كل دقيقة

    return () => clearInterval(interval);
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        roles,
        user,
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
