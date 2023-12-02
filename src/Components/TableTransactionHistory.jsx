import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';

export const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID="fxAEXzfQSHf26vyOJFPFOtpcZyE3"
        const response = await axios.get(`http://localhost:3002/user/getTransactions/${userID}`);
        const data = response.data.transactions;

        const latestTransactions = data.slice(0, 8);

        setTransactions(latestTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      Header: 'Title',
      accessor: 'data.title',
    },
    {
      Header: 'Amount',
      accessor: 'data.amount',
    },
    {
      Header: 'Category',
      accessor: 'data.category',
    },
    {
      Header: 'Description',
      accessor: 'data.description',
    },
    {
      Header: 'Type',
      accessor: 'data.type',
    },
  ];

  return (
    <div>
      <h2>Latest Transactions</h2>
      <ReactTable data={transactions} columns={columns} />
    </div>
  );
};

export default TransactionTable;
