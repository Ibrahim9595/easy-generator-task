import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login, signup, type User } from "./api/auth";
import { clearTokens } from "./api/storage";

type AuthContextType = {
  userData: User | null;
  authError: boolean;
  handleLogout: () => void;
  handleLogin: (data: { email: string; password: string }) => Promise<void>;
  handleSignup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authError, setAuthError] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const handleGetUserData = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setUserData(userData);
      } else {
        setAuthError(true);
      }
    };

    handleGetUserData();
  }, []);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data.email, data.password);
      setUserData(response.user);
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError(true);
    }
  };

  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await signup(data.name, data.email, data.password);
      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup failed:", error);
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    clearTokens();
    setUserData(null);
  };

  const value = {
    authError,
    handleLogin,
    handleSignup,
    handleLogout,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
