import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  color: red;
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
        setCurrencies(currencyList);
        setSelectedCurrency(currencyList[0]); // Set default selected currency
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
