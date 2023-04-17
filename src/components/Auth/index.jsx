import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../GlobalStateProvider";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useContext(GlobalStateContext);
  const [isAuthValid, setIsAuthValid] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const isAuthValid = accessToken !== undefined;

    setIsAuthValid(isAuthValid);

    if (isAuthValid && !userData?.name) {
      const { sub } = jwt_decode(accessToken);
      updateUserData({
        ...userData,
        name: sub,
      });
    }

    if (!isAuthValid) {
      updateUserData({});
      navigate("/login");
      return;
    }
  });

  return <>{isAuthValid && children}</>;
};
