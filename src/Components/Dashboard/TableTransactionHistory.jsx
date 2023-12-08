import React, { useState } from "react";
import { TransactionTable } from "../Shared Components/TransactionsTable";
import "./Styles/TableTransactionHistory.css";
import { Navigate, useNavigate } from "react-router";

export const TransactionHistoryTable = ({ refresh, numberOfTransactions }) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-table-container">
      <div className="dashboard-table-header">
        <h2 className="dashboard-table-title">Latest Transactions</h2>
        <button
          data-test-id="dashboard-view-all-transactions"
          className="dashboard-all-transactions-btn"
          onClick={() => navigate("/user/transactions")}
        >
          View all Transactions
        </button>
      </div>
      <TransactionTable
        refresh={refresh}
        numberOfTransactions={numberOfTransactions}
        className="dashboard-table"
      />
    </div>
  );
};

export default TransactionHistoryTable;
