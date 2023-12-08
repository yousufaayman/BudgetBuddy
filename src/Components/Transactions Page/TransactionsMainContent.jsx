import React, { useState } from "react";
import { TransactionsNavbar } from "./TransactionsContentNavBar";
import { ManageTransactions } from "./ManageTransactions";
import { EditTransactions } from "./EditTransactions";
import "./Styles/TransactionsMainContent.Module.css";

export const TransactionsMainContent = () => {
  const [step, setStep] = useState(1);

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  let currentStep;
  switch (step) {
    case 1:
      currentStep = <ManageTransactions />;
      break;
    case 2:
      currentStep = <EditTransactions />;
      break;
    case 3:
      currentStep = <ManageTransactions />;
      break;
    case 4:
      currentStep = <ManageTransactions />;
      break;
    case 5:
      currentStep = <ManageTransactions />;
      break;
    default:
      currentStep = <ManageTransactions />;
  }

  return (
    <div className="MainContent">
      <TransactionsNavbar goToStep={goToStep} />
      {currentStep}
    </div>
  );
};

export default TransactionsMainContent;
