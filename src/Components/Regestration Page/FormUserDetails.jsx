import React, { useState } from "react";
import "./Styles/RegestrationForm.css";
import { InputStyled } from "../Shared Components/Styles/InputStyled";
import { LabelStyled } from "../Shared Components/Styles/LabelStyled";
import { ButtonStyled } from "../Shared Components/Styles/ButtonStyled";
import { CountryList } from "./CountryList";
import CurrencyList from "./CurrencyDropdown";

export const FormUserDetails = ({
  prevStep,
  nextStep,
  handleChange,
  values,
  fvalues,
}) => {
  const [countries, setCountries] = useState([]);
  CountryList(countries, setCountries);

  const [currencies, setCurrencies] = useState([]);
  CurrencyList(currencies, setCurrencies);

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="sign-up-form-2">
      <LabelStyled gridcolumn="1 / 2" gridrow=" 2 / 3">
        Country
      </LabelStyled>
      <select
        className="country-dropdown"
        value={values.country}
        onChange={handleChange("country")}
      >
        <option value="" disabled selected>
          Country : {fvalues.country}
        </option>
        {countries.map((country) => (
          <option key={country.cca3} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>

      <LabelStyled gridcolumn="1 / 2" gridrow=" 3 / 4">
        Currency
      </LabelStyled>
      <select
        className="currency-dropdown"
        id="currency"
        onChange={handleChange("currency")}
        value={values.currency}
      >
        <option value="" disabled selected>
          Currency : {fvalues.currency}
        </option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <LabelStyled gridcolumn="1 / 2" gridrow=" 4 / 5">
        {" "}
        Average Monthly Salary
      </LabelStyled>
      <InputStyled
        gridarea="4/2/5/3"
        type="number"
        placeholder={fvalues.avgIncome}
        value={values.avgIncome}
        onChange={handleChange("avgIncome")}
      />

      <ButtonStyled
        data-test-id= "pevious-for-regestration"  
        fsize="90%"
        color="#FFF3E2"
        bgcolor1="#FFF3E2"
        bgcolor2="#670AAD"
        height="70%"
        width="50%"
        qheight="50%"
        gridarea="6 / 1 / 7 / 2"
        margin="10%"
        onClick={Previous}
      >
        Previous
      </ButtonStyled>

      <ButtonStyled
        data-test-id= "next-for-regestration" 
        fsize="130%"
        color="#FFF3E2"
        bgcolor1="#ea4e33"
        bgcolor2="#ad0b82"
        height="70%"
        width="50%"
        gridarea="6 / 2 / 7 / 3"
        qheight="50%"
        margin="10%"
        onClick={Continue}
      >
        Next
      </ButtonStyled>
    </div>
  );
};

export default FormUserDetails;
