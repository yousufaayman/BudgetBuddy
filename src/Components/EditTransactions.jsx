import React, { useState } from 'react';
// import './Styles/DashboardMainContent.Module.css';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { TransactionPopup } from './TransactionPopup';
import { ListTransactionsTable } from './ListTransactionsTable'

export const EditTransactions = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [refreshTable, setRefreshTable] = useState(false);

  const handleOpenPopupIncome = () => {
    setIsPopupOpen(true);
    setTransactionType('income');
  };

  const handleOpenPopupExpense = () => {
    setIsPopupOpen(true);
    setTransactionType('expense');
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setRefreshTable(prev => !prev);
  };

  return (
    <div className="manage-transactions">
      {isPopupOpen && (
        <TransactionPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          type={transactionType}
        />
      )}

      <ListTransactionsTable refresh={refreshTable} numberOfTransactions="8"/>
    </div>
  );
};

export default EditTransactions;
