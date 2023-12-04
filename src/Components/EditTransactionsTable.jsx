import React, { useState } from 'react';
import { TransactionTable } from './TransactionsTable';
import './Styles/EditTransactionsTable.css';

export const EditTransactionsTable = ({ refresh, onTransactionSelect }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionId = (transaction) => {
    setSelectedTransaction(transaction);
    onTransactionSelect(transaction);
  };

  return (
    <div className="edit-table-container">
      <div className="table-header">
        <h2 className='table-title'>Transactions</h2>
      </div>
      <TransactionTable refresh={refresh} selectable={true} onSelect={handleTransactionId} filterType={"income"} />
    
    </div>
  );
};

export default EditTransactionsTable;
