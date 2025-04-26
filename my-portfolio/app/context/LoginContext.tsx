"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn: boolean) => {},
});

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedInState(true);
    }
  }, []);

  const setIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedInState(loggedIn);
    localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
