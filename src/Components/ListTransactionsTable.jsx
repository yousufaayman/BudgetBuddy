import React, { useState} from 'react';
import {TransactionTable} from './TransactionsTable'
import './Styles/ListTransactionsTable.css';

export const ListTransactionsTable = ({ refresh, additionalClassName }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={` ${additionalClassName ? additionalClassName : ''} table-container`}>
      <div className="table-header">
        <h2 className='table-title'>Latest Transactions</h2>
        <button className='all-transactions-btn' onClick={() => refresh && setTransactions(transactions)}>View all Transactions</button>
      </div>
      <TransactionTable />
    </div>
  );
};

export default ListTransactionsTable;
