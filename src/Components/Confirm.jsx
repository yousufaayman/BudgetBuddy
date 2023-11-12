import React from 'react'
import './Styles/Confirm.Module.css'
import { ButtonStyled } from './Styles/ButtonStyled'
import { LabelStyled } from './Styles/LabelStyled'

export const Confirm = ({prevStep, nextStep, values, handleSignUp}) => {
  
  const Continue = e => {
    e.preventDefault();
    nextStep();
      }

  const Previous = e => {
    e.preventDefault();
    prevStep();
      }
  
  return (
    <div className='confirm-form'>
      
      <h1 className="form-title">Please review your info :)</h1>

      <LabelStyled gridcolumn= "1 / 3" gridrow= "3 / 4">First Name:{values.firstName}</LabelStyled>
      <LabelStyled gridcolumn= "1 / 3" gridrow= "4 / 5">Last Name: {values.lastName}</LabelStyled> 
      <label className='email'>Email: {values.email}</label> 
      <LabelStyled gridcolumn= "1 / 3" gridrow= "6 / 7">Password: {values.password}</LabelStyled> 
      <LabelStyled gridcolumn= "1 / 3" gridrow= "7 / 8">Currency: {values.currency}</LabelStyled> 
      <LabelStyled gridcolumn= "1 / 3" gridrow= "8 / 9">Country: {values.country}</LabelStyled> 
      <LabelStyled gridcolumn= "1 / 3" gridrow= "9 / 10">Monthly Income: {values.avgIncome}</LabelStyled>  

      <ButtonStyled
        fsize = "100%" 
        color= "#FFF3E2" 
        bgcolor1 = "#FFF3E2" 
        bgcolor2 = "#3f00ee" 
        height= "90%" 
        width= "60%" 
        qheight = "70%"
        qwidth = "70%"
        gridarea= "12 / 2 / 13 / 3" 
        onClick={ handleSignUp }>
          Confirm :)
        </ButtonStyled>

      <ButtonStyled
          fsize = "80%" 
          color= "#FFF3E2" 
          bgcolor1 = "#FFF3E2" 
          bgcolor2 = "#7D2E68" 
          height= "90%" 
          width= "60%" 
          qheight = "70%"
          qwidth = "70%"
          gridarea= "12 / 1 / 13 / 2" 
          onClick={ Previous }>
            Previous
          </ButtonStyled >

    </div>
  )
}

export default Confirm