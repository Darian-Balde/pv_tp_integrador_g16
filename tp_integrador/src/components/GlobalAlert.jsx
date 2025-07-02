import React from "react";
import { useAlert } from "./AlertContext";

const GlobalAlert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert.show) return null;

  return (
    <div
      className={`alert alert-${alert.variant} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`}
      style={{ zIndex: 9999, minWidth: 300, maxWidth: 500 }}
      role="alert"
    >
      {alert.message}
    </div>
  );
};

export default GlobalAlert;