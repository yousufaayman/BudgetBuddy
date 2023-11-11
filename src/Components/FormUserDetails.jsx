import React, {useState} from 'react'
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

        <LabelStyled gridColumn= "1 / 1">Country</LabelStyled>
        <CountryDropdown/>

        <LabelStyled gridColumn= "1 / 1">Currency</LabelStyled>
        <CurrencyDropdown/>

        <LabelStyled gridColumn= "1 / 1"> Average Monthly Income</LabelStyled>
        <InputStyled 
            type = "number" 
            placeholder = "Average Monthly Income" 
            value = {values.avgIncome} 
            onChange = {handleChange('avgIncome')}
          />

                <ButtonStyled
          fsize = "100%" 
          color= "#FFF3E2" 
          bgcolor1 = "#FFF3E2" 
          bgcolor2 = "#7D2E68" 
          height= "70%" 
          width= "50%" 
          qheight = "15%"
          gridarea= "5 / 1 / 7 / 2" 
          margin = "10%"
          onClick={ Previous }>
            Previous
          </ButtonStyled >

        <ButtonStyled 
          fsize = "130%" 
          color= "#FFF3E2" 
          bgcolor1 = "#FFF3E2" 
          bgcolor2 = "#7D2E68" 
          height= "70%" 
          width= "50%" 
          gridarea= "5 / 2 / 7 / 3" 
          qheight = "15%"
          margin = "10%"
          onClick={ Continue }>
            Next
        </ButtonStyled >

      </div>
  )
}

export default FormUserDetails
