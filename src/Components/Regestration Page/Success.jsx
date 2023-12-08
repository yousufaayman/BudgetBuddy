import React, { useContext, useEffect } from "react";
import "./Styles/RegestrationForm.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Services/UserContext";

export const Success = ({ values }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(values.uid);

    const timeout = setTimeout(() => {
      navigate("/user/dashboard");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, values.uid, setUser]);

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
