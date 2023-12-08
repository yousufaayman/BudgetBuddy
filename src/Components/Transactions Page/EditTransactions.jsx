import React, { useState } from "react";
import "./Styles/EditTransactions.css";
import { EditTransactionsTable } from "./EditTransactionsTable";
import { EditSelectedTransactions } from "./EditSelectedTransaction";

export const EditTransactions = () => {
  const [refreshTable, setRefreshTable] = useState(false);
  const [editSelectedTransaction, setEditSelectedTransaction] = useState(null);

  const handleSelectedTransaction = (transaction) => {
    setEditSelectedTransaction(transaction);
  };

  const handleTableRefresh = (status) => {
    setRefreshTable(status);
  };

  return (
    <div className="edit-transactions">
      <EditTransactionsTable
        refresh={refreshTable}
        onTransactionSelect={handleSelectedTransaction}
      />
      <EditSelectedTransactions
        editSelectedTransaction={editSelectedTransaction}
        editRefreshTable={handleTableRefresh}
      />
    </div>
  );
};

export default EditTransactions;
