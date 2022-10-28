import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  onLogin: () => {},
  onLogout: () => {},
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(exp).getTime();
  const remainingDuration = adjExpTime - currentTime;
  return remainingDuration;
};

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const storedExpDate = localStorage.getItem("expDate");
  const remainingTime = calculateRemainingTime(storedExpDate);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expDate");
    return null;
  }
  return {
    token: storedToken,
    user: storedUser,
    duration: remainingTime,
  };
};

let logoutTimer;

export const AuthContextProvider = ({ children }) => {
  const tokenData = retriveStoredToken();

  let initialToken;
  let initialUser;
  
  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = tokenData.user;
  }
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expDate");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (token, user, exp) => {
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("expDate", exp);
      const remainingTime = calculateRemainingTime(exp);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [logoutHandler]
  );

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }

    return () => clearTimeout(logoutTimer);
  }, [logoutHandler, tokenData]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        user: user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
