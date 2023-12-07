import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from your API or Firebase
    // Update the state with the fetched transactions
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3002'); // replace with actual API endpoint
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Run only once on component mount

  const handleExportCSV = async () => {
    try {
      const response = await axios.get('http://localhost:3002/export-csv', {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleExportCSV}>Export CSV</button>
    </div>
  );
};

export default TransactionHistory;
