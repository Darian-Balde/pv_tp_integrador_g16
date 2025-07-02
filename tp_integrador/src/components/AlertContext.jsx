import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });

  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 1200);
  };

  const hideAlert = () => setAlert({ ...alert, show: false });

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};