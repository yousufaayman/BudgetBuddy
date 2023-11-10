import React from 'react'
import './Styles/RegestrationForm.css'
import { InputStyled } from './Styles/InputStyled';
import { LabelStyled } from './Styles/LabelStyled';
import CurrencyDropdown from './Styles/CurrencyDropdown';
import CountryDropdown from './Styles/CountryDropdown';
import { ButtonStyled } from './Styles/ButtonStyled';

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
        <CountryDropdown className="dropdown"/>

        <LabelStyled> Currency</LabelStyled>
        <CurrencyDropdown className="dropdown"/>

        <LabelStyled> Average Monthly Income</LabelStyled>
        <InputStyled 
            type = "number" 
            placeholder = "Average Monthly Income" 
            value = {values.avgIncome} 
            onChange = {handleChange('avgIncome')}
          />

        <ButtonStyled 
          fsize = "130%" 
          color= "#FFF3E2" 
          bgcolor1 = "#FFF3E2" 
          bgcolor2 = "#7D2E68" 
          height= "70%" 
          width= "50%" 
          gridarea= "5 / 2 / 7 / 3" 
          onClick={ Continue }>
            Next
        </ButtonStyled >
        <ButtonStyled
          fsize = "100%" 
          color= "#FFF3E2" 
          bgcolor1 = "#FFF3E2" 
          bgcolor2 = "#7D2E68" 
          height= "70%" 
          width= "50%" 
          gridarea= "5 / 1 / 7 / 2" 
          onClick={ Previous }>
            Previous
          </ButtonStyled >

      </div>
  )
}

export default FormUserDetails
