import React from 'react';
import './Styles/TransactionsContentNavBar.css'

export function TransactionsNavbar({ goToStep }) {
  const handleStepClick = (stepNumber) => {
    goToStep(stepNumber);
  };

  return (
    <nav className='transactions-navbar'>
      <ul className='transactions-menu'>

        <li className='transactions-menu-item'>
          <button className='transactions-menu-button' onClick={() => handleStepClick(1)}>
            Transactions</button>
        </li>
        
        <li className='transactions-menu-item'>
          <button className='transactions-menu-button' onClick={() => handleStepClick(2)}>
          Edit Transactions</button>
        </li>

        <li className='transactions-menu-item'>
          <button className='transactions-menu-button' onClick={() => handleStepClick(3)}>
          Manage Categories</button>
        </li>

        <li className='transactions-menu-item'>
          <button className='transactions-menu-button' onClick={() => handleStepClick(4)}>
           View Income</button>
        </li>

      </ul>
    </nav>
  );
}

export default TransactionsNavbar;
