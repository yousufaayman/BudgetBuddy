import React, {useState} from 'react'
import './Styles/RegestrationForm.css'
import { LabelStyled } from './Styles/LabelStyled';
import { InputStyled } from './Styles/InputStyled';
import { ButtonStyled } from './Styles/ButtonStyled';

export const FormPersonalDetails = ({nextStep, handleChange, values, errorHandle}) => {

  const Continue = e => {
    e.preventDefault();
    nextStep()
  }
  
  return (
    <div className='sign-up-form'>
             
        <LabelStyled>First Name</LabelStyled>
        <InputStyled
            className='form-input' 
            type="text" 
            placeholder="First Name" 
            value={values.firstName} 
            onChange={handleChange('firstName')
          }
            
          />

        <LabelStyled>Last Name</LabelStyled>
        <InputStyled 
            type="text" 
            placeholder="Last Name" 
            value={values.lastName} 
            onChange={handleChange('lastName')}
          />
        
        <LabelStyled>Email</LabelStyled>
        <InputStyled 
            type="text" 
            placeholder="Email Address" 
            value={values.Email} 
            onChange={handleChange('email')}
            
          />

        <LabelStyled>Password</LabelStyled>
        <InputStyled 
            type="password" 
            placeholder="Password" 
            value={values.password}
            onChange={handleChange('password')}
          />

        <LabelStyled>Confirm Password</LabelStyled>
        <InputStyled 
            type="password" 
            placeholder="Confirm Password" 
            value={values.check_password} 
            onChange={handleChange('check_password')
          }
            
          />

        <ButtonStyled 
          fsize = "130%" 
          color= "#FFF3E2" 
          bgcolor1 = "#FFF3E2" 
          bgcolor2 = "#7D2E68" 
          height= "70%" 
          width= "50%" 
          Qheight = "10%"
          Qwidth = "50%"
          Qmargin = "5%"
          gridarea= "6 / 1 / 7 / 3" 
          onClick={ Continue }
          >
            Next
          </ButtonStyled>
          <p className="errors">{errorHandle}</p>
    </div>
  )
}

export default FormPersonalDetails
