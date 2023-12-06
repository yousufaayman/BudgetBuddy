import React, { useState, useEffect } from 'react';
import './Styles/DashboardMainContent.Module.css';
import { TbPigMoney } from 'react-icons/tb';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { TransactionPopup } from './TransactionPopup';
import { TransactionTable } from './TableTransactionHistory'
import axios from 'axios';
import { API_URL } from '../lib/const';
import { getCookie } from '../lib/CookieHandler';


export const MainContent = () => {
  const [balance, setBalance] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [refreshTable, setRefreshTable] = useState(false);
  const user = getCookie("__tK__");
  const userID = user.uid;

  const getBalance = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/getBalance/${userID}`);
      if (data && data.hasBalance) {
        setBalance(data.balance);
      }
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    getBalance()
  }, [refreshTable])

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
          <TbPigMoney />Real-Time Balance: {balance? balance: ""}
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
