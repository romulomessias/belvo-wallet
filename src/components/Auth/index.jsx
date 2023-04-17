import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isAuthValid: false,
  userData: null,
  contacts: [],
  transactions: [],
  updateUserData: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthValid, setIsAuthValid] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const isAuthValid = accessToken !== undefined;

    setIsAuthValid(isAuthValid);

    if (isAuthValid && !userData) {
      const { sub } = jwt_decode(accessToken);
      setUserData({
        name: sub,
      });
    }

    if (!isAuthValid) {
      setUserData(null);
      navigate("/login");
      return;
    }
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthValid,
        userData: userData,
        updateUserData: setUserData,
      }}
    >
      {isAuthValid && children}
    </AuthContext.Provider>
  );
};
