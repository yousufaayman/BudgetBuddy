import React from 'react'

export const FormPersonalDetails = ({nextStep, handleChange, values}) => {
  
  const Continue = e => {
  e.preventDefault();
  nextStep();
    }
  
  return (
    <div>
             
        <label>First Name
          <input 
            type="text" 
            placeholder="First Name" 
            value={values.firstName} 
            onChange={handleChange('firstName')}
          />
        </label>

        <label>Last Name
          <input 
            type="text" 
            placeholder="Last Name" 
            value={values.lastName} 
            onChange={handleChange('Last Name')}
          />
        </label>
        
        <label>Email
          <input 
            type="text" 
            placeholder="Email Address" 
            value={values.email} 
            onChange={handleChange('email')}
          />
        </label>

        <label>Password
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
