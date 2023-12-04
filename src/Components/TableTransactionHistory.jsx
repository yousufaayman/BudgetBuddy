import React, {useState} from 'react';
import {TransactionTable} from './TransactionsTable'
import './Styles/TableTransactionHistory.css';

export const TransactionHistoryTable = ({ refresh, numberOfTransactions }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className='table-container'>
      <div className="table-header">
        <h2 className='table-title'>Latest Transactions</h2>
        <button className='all-transactions-btn' onClick={() => refresh && setTransactions(transactions)}>View all Transactions</button>
      </div>
      <TransactionTable refresh={refresh} numberOfTransactions={numberOfTransactions}/>
    </div>
  );
};

export default TransactionHistoryTable;
