import React from "react";
import "./Styles/LandingContent.Module.css";

export function LandingContent() {
  return (
    <div className="main-content">
      <p className="main-slogan">Empower Your Wallet with Budget Buddy!</p>
      <img
        className="budget-buddy-logo"
        src="BudgetBuddyLogo.png"
        alt="budget buddy logo"
      />
      <p className="sub-heading-1">
        "Do not save what is left after spending, but spend what is left after
        saving." - Warren Buffett
      </p>
      <p className="sub-heading-2">
        "Money, like emotions, is something you must control to keep your life
        on the right track." - Natasha Munson
      </p>
    </div>
  );
}
