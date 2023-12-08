import React from "react";
import "./Styles/LoginForm.Module.css";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="formdiv">
      <h1 className="main-heading">Login</h1>

      <div className="input-container">
        <form className="input-container">
          <input type="text" placeholder="Email" className="input" />
          <input type="Password" placeholder="Password" className="input" />
          <button className="landing-login-button">Login</button>
        </form>
      </div>

      <div className="login-with-container">
        <h5 className="login-option-text">Or Login With</h5>
        <hr className="horizontal-rule" />
        <GrGoogle size={50} color="#fff5ea" />
      </div>

      <div className="login-help-container">
        <button className="login-form-sub-buttons">Forgot Passowrd?</button>
        <button
          className="login-form-sub-buttons"
          onClick={() => navigate("/registration-page")}
        >
          No Account? Sign up!
        </button>
      </div>
    </div>
  );
}
