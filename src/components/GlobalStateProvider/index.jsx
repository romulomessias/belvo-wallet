import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalStateContext = createContext({
  userData: { name: "", email: "" },
  balance: {},
  contacts: [],
  transactions: [],
  updateUserData: (data) => {},
  updateBalance: (balance) => {},
  updateContacts: (contacts) => {},
  updateTransactions: (transactions) => {},
});

export const GlobalStateProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [contacts, setContacts] = useState([]);

  return (
    <GlobalStateContext.Provider
      value={{
        userData,
        balance,
        transactions,
        contacts,
        updateUserData: setUserData,
        updateBalance: setBalance,
        updateContacts: setContacts,
        updateTransactions: setTransactions,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
