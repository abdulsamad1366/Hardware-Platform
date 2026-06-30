"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  name: string;
  email: string;
  company: string;
  phone: string;
  city: string;
  gst?: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: UserSession & { password?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_MOCK_USER = {
  name: "John Admin",
  email: "b2b@securelink.com",
  company: "SecureLink Partners Ltd",
  phone: "9876543210",
  city: "Mumbai",
  password: "password123",
  gst: "27AAAAA1111A1Z1"
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize and load session & mock db on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Setup mock registered users database
      const savedUsers = localStorage.getItem("securelink_registered_users");
      if (!savedUsers) {
        localStorage.setItem(
          "securelink_registered_users",
          JSON.stringify([DEFAULT_MOCK_USER])
        );
      }

      // 2. Load active session
      const activeSession = localStorage.getItem("securelink_auth_session");
      if (activeSession) {
        try {
          setUser(JSON.parse(activeSession));
        } catch (e) {
          console.error("Failed to parse auth session", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save session to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("securelink_auth_session", JSON.stringify(user));
      } else {
        localStorage.removeItem("securelink_auth_session");
      }
    }
  }, [user, isLoaded]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (typeof window === "undefined") return false;

    const savedUsersStr = localStorage.getItem("securelink_registered_users") || "[]";
    try {
      const registeredUsers = JSON.parse(savedUsersStr);
      const matchedUser = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedUser) {
        // Exclude password from active session state
        const { password: _, ...sessionData } = matchedUser;
        setUser(sessionData);
        return true;
      }
    } catch (e) {
      console.error("Login verification error", e);
    }

    return false;
  };

  const register = async (userData: UserSession & { password?: string }): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (typeof window === "undefined") return false;

    const savedUsersStr = localStorage.getItem("securelink_registered_users") || "[]";
    try {
      const registeredUsers = JSON.parse(savedUsersStr);
      
      // Check if user already exists
      if (registeredUsers.some((u: any) => u.email.toLowerCase() === userData.email.toLowerCase())) {
        return false;
      }

      // Add user to database
      const newUser = {
        name: userData.name,
        email: userData.email,
        company: userData.company,
        phone: userData.phone,
        city: userData.city,
        password: userData.password || "password123", // default fallback
        gst: userData.gst || ""
      };

      registeredUsers.push(newUser);
      localStorage.setItem("securelink_registered_users", JSON.stringify(registeredUsers));

      // Auto login after registration
      const { password: _, ...sessionData } = newUser;
      setUser(sessionData);
      return true;
    } catch (e) {
      console.error("Registration error", e);
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
