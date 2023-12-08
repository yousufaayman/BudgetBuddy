import React from "react";
import { FcOk, FcHighPriority } from "react-icons/fc";

export const StatusPopup = ({ isSuccess, message }) => {
  return (
    <div className="status-overlay">
      <p className="popup-text">
        {isSuccess ? "Transaction added successfully!" : message}
      </p>
      <br />
      {isSuccess ? (
        <FcOk style={{ width: "100%" }} />
      ) : (
        <FcHighPriority style={{ width: "100%" }} />
      )}
    </div>
  );
};

export default StatusPopup;
