import React from 'react'

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
      <div>

        <label> Country
          <input 
            type="text" 
            placeholder="Country" 
            value={values.country} 
            onChange={handleChange('country')}
          />
        </label>

        <label> Currency
          <input 
            type="text" 
            placeholder="Currency" 
            value={values.currency} 
            onChange={handleChange('currency')}
          />
        </label>

        <label> Average Monthly Income
          <input 
            type = "number" 
            placeholder = "Average Monthly Income" 
            value = {values.avgIncome} 
            onChange = {handleChange('avgIncome')}
          />
        </label>

        <button onClick={ Continue }>Next</button>
        <button onClick={ Previous }>Previous</button>

      </div>
  )
}

export default FormUserDetails
