import React from 'react'
import './Styles/RegestrationForm.css'
import { LabelStyled } from './Styles/LabelStyled';
import { InputStyled } from './Styles/InputStyled';

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export const FormPersonalDetails = ({nextStep, handleChange, values}) => {
  
  const Continue = e => {
  e.preventDefault();
  nextStep();
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
            value={values.email} 
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
            value={values.password} 
            onChange={handleChange('password')
          }
            
          />

        <button className="next-button-1" onClick={ Continue }>Next</button>
      
    </div>
  )
}

export default FormPersonalDetails
