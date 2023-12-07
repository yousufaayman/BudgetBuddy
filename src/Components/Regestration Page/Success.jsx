import React from "react";
import "./Styles/RegestrationForm.css";

export const Success = ({ values }) => {
  return (
    <div className="success-form">
      <h1 className="welcome-text">
        Welcome to your journey towards financial reedom, Welcome to Budget
        Buddy {values.firstName} {values.lastName}!
      </h1>
    </div>
  );
};

export default Success;
