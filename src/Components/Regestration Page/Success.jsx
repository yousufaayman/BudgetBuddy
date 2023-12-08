import React from "react";
import "./Styles/RegestrationForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Success = ({ values }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user/dashboard");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-form">
      <h1 className="welcome-text">
        Welcome to your journey towards financial freedom, Welcome to Budget
        Buddy {values.firstName} {values.lastName}!
      </h1>
    </div>
  );
};

export default Success;
