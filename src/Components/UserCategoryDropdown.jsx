import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseCategoriesDropdown = ({ className, userID, onCategoryChange }) => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState('');

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/getExpenseCategories/${userID}`);
        setExpenseCategories(response.data.expenseCategories);
      } catch (error) {
        console.error('Error fetching expense categories:', error);
      }
    };

    fetchExpenseCategories();
  }, [userID]);

  const handleExpenseCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedExpenseCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
      <select className={className} value={selectedExpenseCategory} onChange={handleExpenseCategoryChange}>
        <option value="">Select an expense category</option>
        {expenseCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
  );
};

const IncomeCategoriesDropdown = ({ className, userID, onCategoryChange }) => {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState('');

  useEffect(() => {
    const fetchIncomeCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/getIncomeCategories/${userID}`);
        setIncomeCategories(response.data.incomeCategories);
      } catch (error) {
        console.error('Error fetching income categories:', error);
      }
    };

    fetchIncomeCategories();
  }, [userID]);

  const handleIncomeCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedIncomeCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
      <select className={className} value={selectedIncomeCategory} onChange={handleIncomeCategoryChange}>
        <option value="">Select an income category</option>
        {incomeCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
  );
};

export { ExpenseCategoriesDropdown, IncomeCategoriesDropdown };
