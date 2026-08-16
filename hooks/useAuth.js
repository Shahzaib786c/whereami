"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearSession,
  createUser,
  getCurrentUser,
  setSession,
  verifyUser,
} from "@/lib/storage";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setReady(true);
  }, []);

  const signup = useCallback(({ name, username, password }) => {
    const result = createUser({ name, username, password });
    if (result.ok) {
      setSession(result.user.username);
      setUser(result.user);
    }
    return result;
  }, []);

  const login = useCallback(({ username, password }) => {
    const result = verifyUser({ username, password });
    if (result.ok) {
      setSession(result.user.username);
      setUser(result.user);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return { user, ready, isLoggedIn: !!user, signup, login, logout };
}
