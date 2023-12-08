import React from "react";
import "./Styles/RegNavbar.Module.css";
import { ButtonStyled } from "../Shared Components/Styles/ButtonStyled";

export function RegNavBar() {
  return (
    <div className="reg-nav-bar">
      \
      <img
        className="reg-logo"
        src="BudgetBuddyLogo.png"
        alt="budget buddy logo"
      />
      <h1 className="reg-budget-buddy">Budget Buddy</h1>
      <ButtonStyled
        data-test-id="login-button-for-navbar"
        fsize="130%"
        color="#FFF3E2"
        bgcolor1="#ea4e33"
        bgcolor2="#ad0b82"
        height="50%"
        width="70%"
        gridarea="1 / 3 / 2 / 4"
        qgridarea="4 / 2 / 5 / 3"
        qwidth="100%"
        qheight="60%"
        className="login-button"
      >
        Login
      </ButtonStyled>
    </div>
  );
}

export default RegNavBar;
