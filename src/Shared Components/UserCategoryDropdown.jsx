import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../Services/UserContext";

const ExpenseCategoriesDropdown = ({ className, onCategoryChange }) => {
  const { user } = useContext(UserContext);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("");

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/getExpenseCategories/${user}`,
        );
        setExpenseCategories(response.data.expenseCategories);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };

    fetchExpenseCategories();
  }, [user]);

  const handleExpenseCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedExpenseCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
    <select
      className={className}
      value={selectedExpenseCategory}
      onChange={handleExpenseCategoryChange}
    >
      <option value="">Select an expense category</option>
      {expenseCategories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

const IncomeCategoriesDropdown = ({ className, onCategoryChange }) => {
  const { user } = useContext(UserContext);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState("");

  useEffect(() => {
    const fetchIncomeCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/getIncomeCategories/${user}`,
        );
        setIncomeCategories(response.data.incomeCategories);
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };

    fetchIncomeCategories();
  }, [user]);

  const handleIncomeCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedIncomeCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
    <select
      className={className}
      value={selectedIncomeCategory}
      onChange={handleIncomeCategoryChange}
    >
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
