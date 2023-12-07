import React from 'react';
import {TransactionTable} from '../Shared Components/TransactionsTable'
import './Styles/ListTransactionsTable.css';

export const ListTransactionsTable = ({ refresh }) => {
  return (
    <div className= 'list-table-container'>
      <div className="list-table-header">
        <h2 className='list-table-title'>Latest Transactions</h2>
      </div>
      <TransactionTable refresh={refresh} className="list-table" innerClassName="list-inner-table-container"/>
    </div>
  );
};

export default ListTransactionsTable;
