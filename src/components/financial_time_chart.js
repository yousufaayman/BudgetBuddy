import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const FinancialTimeChart = () => {
  const [balances, setBalances] = useState({});
  const [timePeriod, setTimePeriod] = useState('7d'); // Default time period: 7 days

  useEffect(() => {
    // Fetch balances data from the backend
    axios.get(`/api/balances?timePeriod=${timePeriod}`)
      .then((response) => {
        setBalances(response.data);
      })
      .catch((error) => {
        console.error('Error fetching balances:', error);
      });
  }, [timePeriod]);

  const handleChangeTimePeriod = (newTimePeriod) => {
    setTimePeriod(newTimePeriod);
  };

  const chartData = {
    labels: Object.keys(balances),
    datasets: [
      {
        label: 'Balance Over Time',
        data: Object.values(balances),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD',
          tooltipFormat: 'll',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Balance',
        },
      },
    },
  };

  return (
    <div>
      <label>
        Select Time Period:
        <select value={timePeriod} onChange={(e) => handleChangeTimePeriod(e.target.value)}>
          <option value="7d">7 Days</option>
          <option value="30d">30 Days</option>
          <option value="90d">90 Days</option>
        </select>
      </label>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default FinancialTimeChart;
