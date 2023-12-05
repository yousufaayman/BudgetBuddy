// CurrencyList.js
import React, { useState, useEffect } from 'react';

const CurrencyList = (currencies, setCurrencies) => {

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest');
        const data = await response.json();
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

};

export default CurrencyList;
