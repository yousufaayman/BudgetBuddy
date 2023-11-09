import React from 'react'
import './Styles/RegestrationForm.css'
import { InputStyled } from './Styles/InputStyled';
import { LabelStyled } from './Styles/LabelStyled';
import CurrencyDropdown from './Styles/CurrencyDropdown';

export const FormUserDetails = ({prevStep, nextStep, handleChange, values}) => {
  
  const Continue = e => {
    e.preventDefault();
    nextStep();
      }

  const Previous = e => {
    e.preventDefault();
    prevStep();
      }
  
  return (
      <div className="sign-up-form">

        <LabelStyled> Country</LabelStyled>
        <InputStyled 
            type="text" 
            placeholder="Country" 
            value={values.country} 
            onChange={handleChange('country')}
          />

        <LabelStyled> Currency</LabelStyled>
        <CurrencyDropdown className="currency-dropdown"/>

        <LabelStyled> Average Monthly Income</LabelStyled>
        <InputStyled 
            type = "number" 
            placeholder = "Average Monthly Income" 
            value = {values.avgIncome} 
            onChange = {handleChange('avgIncome')}
          />

        <button className='next-button-2' onClick={ Continue }>Next</button>
        <button className='previous-button' onClick={ Previous }>Previous</button>

      </div>
  )
}

export default FormUserDetails
