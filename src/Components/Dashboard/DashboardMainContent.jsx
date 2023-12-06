import React, { useState, useContext, useEffect } from 'react';
import './Styles/DashboardMainContent.Module.css';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { TransactionPopup } from '../Shared Components/TransactionPopup';
import { TransactionHistoryTable } from '../Shared Components/TableTransactionHistory'
import UserContext from '../UserContext';


export const DashboardMainContent = ({refresh}) => {
  const { user, walletId } = useContext(UserContext);
  const [UserId, setUserId] = useState(false);
  const [WalletId, setWalletId] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    setRefreshTable(refresh);
  }, [refresh]);

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

  useEffect(() => {
    setWalletId(walletId)
    setUserId(user)
  });
  

  return (
    <div className="MainContent">
      {WalletId ? (
        <>
          <div className="main-features">
            <div className="balance">
              <TbPigMoney />Real-Time Balance::
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
  
          <TransactionHistoryTable refresh={refreshTable} numberOfTransactions="8"/>
        </>
      ):(<div>Please Select a Wallet</div>)}
    </div>
  );  
};

export default DashboardMainContent;
