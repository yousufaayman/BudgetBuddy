import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledSelect = styled.select`
    background-color : #E74646;
    font-family: 'Roboto Mono';
    width: 150%;
    height: 100%;
    border: none;
    text-align: center;
    padding: 3%;
    border-radius: 0.8rem;
    color: #FFF3E2;
`

const CurrencyDropdown = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  useEffect(() => {
    // Fetch currency data from the API
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          'https://open.er-api.com/v6/latest'
        );
        const { rates } = response.data;
        const currencyList = Object.keys(rates);
        const sortedCurrencies = currencyList.sort(); // Sort currencies alphabetically
        setCurrencies(sortedCurrencies);
        
        // Check if 'EGP' exists in the currency list
        const defaultCurrency = sortedCurrencies.includes('EGP') ? 'EGP' : sortedCurrencies[0];
        setSelectedCurrency(defaultCurrency); // Set default selected currency
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div>
      <StyledSelect
        id="currency"
        onChange={(e) => setSelectedCurrency(e.target.value)}
        value={selectedCurrency}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

export default CurrencyDropdown;
