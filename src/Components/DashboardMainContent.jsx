
import React, { useState } from 'react';
import './Styles/DashboardMainContent.Module.css'
import { TbPigMoney } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { TransactionPopup } from './TransactionPopup'

export const MainContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  let type = ""

  const handleOpenPopupIncome = () => {
    type = "income";
    setIsPopupOpen(true);
  };

  const handleOpenPopupExpense = () => {
    type = "expense";
    console.log(type)
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const blurPage = {
    filter: 'blur(5px)'
  }

    return (
      <div className="MainContent">
          <div className="main-features">
            <div className="balance"><TbPigMoney/>Real-Time Balance: </div>
            <button onClick={handleOpenPopupIncome} className="add-income"><GiReceiveMoney/>Add Income</button>
            <button onClick={handleOpenPopupExpense} className="add-expense"><GiPayMoney/>Add Expense</button>
          </div>

          <TransactionPopup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              type= {type}
            />
      </div>
    );
  }
  
  export default MainContent;