import React from 'react'
import './Styles/SignUpPage1.css'

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
    <div className='sign-up-form-1'>
             
        <label className='form-labels'>First Name
          <input 
            type="text" 
            placeholder="First Name" 
            value={values.firstName} 
            onChange={handleChange('firstName')}
          />
        </label>

        <label  className='form-labels'>Last Name
          <input 
            type="text" 
            placeholder="Last Name" 
            value={values.lastName} 
            onChange={handleChange('lastName')}
          />
        </label>
        
        <label  className='form-labels'>Email
          <input 
            type="text" 
            placeholder="Email Address" 
            value={values.email} 
            onChange={handleChange('email')}
          />
        </label>

        <label  className='form-labels'>Password
          <input 
            type="password" 
            placeholder="Password" 
            value={values.password} 
            onChange={handleChange('password')}
          />
        </label>

        <button onClick={ Continue }>Next</button>
      
    </div>
  )
}

export default FormPersonalDetails
