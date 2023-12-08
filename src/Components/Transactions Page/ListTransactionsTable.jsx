import React from "react";
import { TransactionTable } from "../Shared Components/TransactionsTable";
import "./Styles/ListTransactionsTable.css";
import html2pdf from "html2pdf.js";

export const ListTransactionsTable = ({ refresh }) => {
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
    <div className="list-table-container">
      <div className="list-table-header">
        <h2 className="list-table-title">Latest Transactions</h2>
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
      <TransactionTable
        id="pdf-content"
        refresh={refresh}
        className="list-table"
        innerClassName="list-inner-table-container"
      />
    </div>
  );
};

export default ListTransactionsTable;
