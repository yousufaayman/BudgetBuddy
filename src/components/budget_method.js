import React, { useState } from 'react';
import axios from 'axios';

const BudgetCalculator = () => {
  const [income, setIncome] = useState(0);
  const [budgetMethod, setBudgetMethod] = useState('50/30/20');
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCalculateBudget = async () => {
    try {
      // Replace 'your-backend-url' with URL of backend server
      const response = await axios.post('http://your-backend-url:3002/budget-buddy', {
        userId: 'user123', // replace with actual user ID
        income,
        budgetMethod,
        recurringExpenses,
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error calculating budget:', error);
    }
  };

  return (
    <div>
      <h1>Budget Calculator</h1>
      <label>
        Monthly Income:
        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
      </label>

      <label>
        Budgeting Method:
        <select value={budgetMethod} onChange={(e) => setBudgetMethod(e.target.value)}>
          <option value="50/30/20">50/30/20</option>
          <option value="70/30">70/30</option>
          <option value="40/30/30">40/30/30</option>
          <option value="40/30/20/10">40/30/20/10</option>
        </select>
      </label>

      <label>
        Recurring Expenses:
        <input
          type="text"
          placeholder="Expense name"
          onChange={(e) => setRecurringExpenses([{ name: e.target.value, amount: 0 }])}
        />
      </label>

      <button onClick={handleCalculateBudget}>Calculate Budget</button>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default BudgetCalculator;
