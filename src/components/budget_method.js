import React, { useState } from 'react';

const BudgetingService = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [allocatedBudget, setAllocatedBudget] = useState({});

  const handleIncomeChange = (e) => {
    setMonthlyIncome(e.target.value);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleCalculateBudget = () => {
    // Add logic to calculate the budget based on the selected budgeting method
    // and any recurring expenses linked to the user's account

    // For simplicity, using a basic switch statement here
    switch (selectedMethod) {
      case '50/30/20':
        setAllocatedBudget({
          necessities: (0.5 * monthlyIncome).toFixed(2),
          wants: (0.3 * monthlyIncome).toFixed(2),
          savings: (0.2 * monthlyIncome).toFixed(2),
        });
        break;
      case '70/30':
        setAllocatedBudget({
          necessities: (0.7 * monthlyIncome).toFixed(2),
          wants: (0.3 * monthlyIncome).toFixed(2),
          savings: '0.00',
        });
        break;
      case '40/30/30':
        setAllocatedBudget({
          necessities: (0.4 * monthlyIncome).toFixed(2),
          wants: (0.3 * monthlyIncome).toFixed(2),
          savings: (0.3 * monthlyIncome).toFixed(2),
        });
        break;
      case '40/30/20/10':
        setAllocatedBudget({
          necessities: (0.4 * monthlyIncome).toFixed(2),
          wants: (0.3 * monthlyIncome).toFixed(2),
          savings: (0.2 * monthlyIncome).toFixed(2),
          other: (0.1 * monthlyIncome).toFixed(2),
        });
        break;
      default:
        setAllocatedBudget({});
    }
  };

  return (
    <div>
      <h2>Budgeting Service</h2>
      <label>
        Monthly Income:
        <input type="number" value={monthlyIncome} onChange={handleIncomeChange} />
      </label>
      <label>
        Select Budgeting Method:
        <select value={selectedMethod} onChange={handleMethodChange}>
          <option value="">Select Method</option>
          <option value="50/30/20">50/30/20</option>
          <option value="70/30">70/30</option>
          <option value="40/30/30">40/30/30</option>
          <option value="40/30/20/10">40/30/20/10</option>
        </select>
      </label>
      <button onClick={handleCalculateBudget}>Calculate Budget</button>

      {Object.keys(allocatedBudget).length > 0 && (
        <div>
          <h3>Allocated Budget</h3>
          <ul>
            {Object.entries(allocatedBudget).map(([category, amount]) => (
              <li key={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}: ${amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetingService;
