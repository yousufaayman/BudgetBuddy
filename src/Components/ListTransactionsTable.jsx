import React from 'react';
import {TransactionTable} from './TransactionsTable'
import './Styles/ListTransactionsTable.css';

export const ListTransactionsTable = ({ refresh }) => {

  const handleTransactionId = (selectedId) => {
    console.log(selectedId);
  };

  return (
    <div className= 'list-table-container'>
      <div className="table-header">
        <h2 className='table-title'>Latest Transactions</h2>
      </div>
      <TransactionTable refresh={refresh} onSelect={handleTransactionId}/>
    </div>
  );
};

export default ListTransactionsTable;
