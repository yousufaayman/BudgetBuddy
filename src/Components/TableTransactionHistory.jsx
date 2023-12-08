import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './Styles/TableTransactionHistory.css'
import { getCookie } from '../lib/CookieHandler';
import { API_URL } from "../lib/const"
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import html2pdf from "html2pdf.js";


const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
  section: { margin: 10, padding: 10, flexGrow: 1 },
});


export const TransactionTable = ({ refresh }) => {
  const [transactions, setTransactions] = useState([]);
  const user = getCookie("__tK__");
  const userID = user.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getTransactions/${userID}`);
        const data = response.data.transactions;

        const transformedData = data
          .map(transaction => ({
            ...transaction.data,
            date: new Date(transaction.data.date._seconds * 1000), 
          }))
          .sort((a, b) => b.date - a.date) 
          .slice(0, 8)
          .map(t => ({ ...t, date: t.date.toLocaleDateString() })); 

        setTransactions(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Recurring',
        accessor: 'recurring',
        Cell: ({ value }) => (value === 'true' ? 'Yes' : 'No'),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: transactions,
  });


  const generatePDF = () => {
    const input = document.getElementById('pdf-content');
    const pdfOptions = {
      margin: 10,
      filename: 'generated-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf(input, pdfOptions);
  };


  return (
    <div id="pdf-content" className='table-container'>
       <button onClick={generatePDF}>Generate PDF</button>
      <div className="table-header"><h2 className='table-title'>Latest Transactions</h2> <button className='all-transactions-btn'>View all Transactions</button></div>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
