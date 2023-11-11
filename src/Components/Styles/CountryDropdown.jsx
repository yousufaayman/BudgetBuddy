import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledSelect = styled.select`
    background-color : #E74646;
    font-family: 'Roboto Mono';
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
    padding: 3%;
    border-radius: 0.8rem;
    color: #FFF3E2;
`

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://restcountries.com/v3.1/all'
        );
        const countryList = response.data.map((country) => country.name.common);
        countryList.sort(); 
        countryList.unshift('Egypt'); 
        setCountries(countryList);
        setSelectedCountry('Egypt');
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <StyledSelect
        id="country"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

export default CountryDropdown;
