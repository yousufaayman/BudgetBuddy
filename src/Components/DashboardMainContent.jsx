import React, { useState } from 'react';
import './Styles/DashboardMainContent.Module.css';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { TransactionPopup } from './TransactionPopup';
import { TransactionTable } from './TableTransactionHistory'

export const MainContent = () => {
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
    <div className="MainContent">

      <div className="main-features">
        <div className="balance">
          <TbPigMoney />Real-Time Balance:{' '}
        </div>
        <button onClick={handleOpenPopupIncome} className="add-income">
          <GiReceiveMoney /> Add Income
        </button>
        <button onClick={handleOpenPopupExpense} className="add-expense">
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

      <TransactionTable refresh={refreshTable}/>
    </div>
  );
};

export default MainContent;
