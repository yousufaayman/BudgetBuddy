import React, { useState } from "react";
import "./Styles/ManageTransactions.css";
import { TbPigMoney } from "react-icons/tb";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { TransactionPopup } from "../Shared Components/TransactionPopup";
import { ListTransactionsTable } from "./ListTransactionsTable";
import { Analysis } from "../Analysis/analysis";

export const ManageTransactions = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  const handleOpenPopupIncome = () => {
    setIsPopupOpen(true);
    setTransactionType("income");
  };

  const handleOpenPopupExpense = () => {
    setIsPopupOpen(true);
    setTransactionType("expense");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setRefreshTable((prev) => !prev);
  };

  return (
    <div className="manage-transactions">
      <div className="manage-balance">
        <TbPigMoney />
        Real-Time Balance::
        <Analysis />
      </div>

      <div className="add-transaction-buttons">
        <button onClick={handleOpenPopupIncome} className="manage-add-income">
          <GiReceiveMoney /> Add Income
        </button>
        <button onClick={handleOpenPopupExpense} className="manage-add-expense">
          <GiPayMoney /> Add Expense
        </button>
      </div>

      {isPopupOpen && (
        <TransactionPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          type={transactionType}
        />
      )}

      <ListTransactionsTable refresh={refreshTable} />
    </div>
  );
};

export default ManageTransactions;
