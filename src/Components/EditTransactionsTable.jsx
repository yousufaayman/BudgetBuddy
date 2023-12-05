import React, { useState } from 'react';
import { TransactionTable } from './TransactionsTable';
import './Styles/EditTransactionsTable.css';
import {ExpenseCategoriesDropdown, IncomeCategoriesDropdown} from './UserCategoryDropdown'

export const EditTransactionsTable = ({ refresh, onTransactionSelect }) => {
  const userID = 'fxAEXzfQSHf26vyOJFPFOtpcZyE3'
  const [filterByType, setfilterByType] = useState("all");
  const [filterByRecurring, setfilterByRecurring] = useState("all");
  const [filterByCategory, setfilterByCategory] = useState("all");
  
  const handleFilterTypeChange = (event) => {
    setfilterByCategory("all");
    setfilterByType(event.target.value);
  };

  const handleFilterRecurringChange = (event) => {
    setfilterByRecurring(event.target.value);
  };

  const handleFilterCategoryChange = (selectedCategory) => {
    selectedCategory === ''? setfilterByCategory("all"):
    setfilterByCategory(selectedCategory);
  };

  const handleTransactionId = (transaction) => {
    onTransactionSelect(transaction);
  };

  return (
    <div className="edit-table-container">
      <div className="table-header">
        <h2 className='table-title'>Transactions</h2>

        <div className='edit-table-filters'>
          <label>Filter By Type: </label>
          <select value={filterByType} onChange={handleFilterTypeChange}>
              <option value="all">No Filter</option>
              <option value="income">Filter By Income</option>
              <option value="expense">Filter By Expense</option>
          </select>
        </div>

        <div className='edit-table-filters'>
          <label>Recurring: </label>
          <select value={filterByRecurring} onChange={handleFilterRecurringChange}>
              <option value="all">No Filter</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
          </select>
        </div>
        
        {filterByType !== 'all' && (
              <div className='edit-table-filters'>
                <label>Category:</label>
                  {filterByType === 'income' && (
                    <IncomeCategoriesDropdown className="filter-category-dropdown" userID={userID} onCategoryChange={handleFilterCategoryChange} />
                  )}
      
                  {filterByType === 'expense' && (
                    <ExpenseCategoriesDropdown className="filter-category-dropdown" userID={userID} onCategoryChange={handleFilterCategoryChange} />
                  )}
              </div>
            )}

        </div>

      <TransactionTable refresh={refresh} selectable={true} onSelect={handleTransactionId} filterType={filterByType} filterRecurring={filterByRecurring} filterCategory={filterByCategory} />
    
    </div>
  );
};

export default EditTransactionsTable;
