import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { sessinToken, Profile } from '../types/User';
import { setAuthToken } from '../utils/request';
import { jwtDecode } from 'jwt-decode';
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
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const COOKIE_NAME = 'Authentication';
const COOKIE_EXPIRES = 1; // يوم كامل – أفضل من حساب الميلي ثانية

const AuthContext = createContext<AuthContextType | null>(null);

// -------------------------
// Helpers
// -------------------------
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
    const decoded: any = jwtDecode(token.replace("Bearer ", ""));
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

// -------------------------
// Provider Component
// -------------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUserState] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load from cookies
  useEffect(() => {
    const data = initializeAuthState();

    if (data) {
      if (isTokenExpired(data.jwtToken)) {
        toast.error("Session expired, please login again.");
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

  // -------------------------
  // Login
  // -------------------------
  const login = useCallback((data: sessinToken) => {
    const formattedToken = data.jwtToken.startsWith('Bearer ')
      ? data.jwtToken
      : `Bearer ${data.jwtToken}`;

    setToken(formattedToken);
    setRoles(data.roles || []);
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
        secure: true,
        sameSite: 'Strict',
      }
    );
  }, []);

  // -------------------------
  // Logout
  // -------------------------
  const logout = useCallback(() => {
    Cookies.remove(COOKIE_NAME);
    setToken(null);
    setRoles([]);
    setUserState(null);
    setAuthToken('');

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  // -------------------------
  // Update user
  // -------------------------
  const setUser = useCallback(
    (userData: Profile | null) => {
      setUserState(userData);

      const cookie = Cookies.get(COOKIE_NAME);
      if (!cookie) return;

      const current = JSON.parse(cookie);
      current.user = userData;

      Cookies.set(COOKIE_NAME, JSON.stringify(current), {
        expires: COOKIE_EXPIRES,
        secure: true,
        sameSite: "Strict",
      });
    },
    [token, roles]
  );

  // -------------------------
  // Auto logout when token expires
  // -------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 60 * 1000); // كل دقيقة

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
        search,
        setSearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
