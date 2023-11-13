import React from 'react'
import './Styles/RegestrationForm.css'


export const Success = ({finalValues}) => {
  return (
    <div className='success-form'>
        <h1 className='welcome-text'>Welcome to your journey towards financial reedom, Welcome to Budget Buddy {finalValues.firstName} {finalValues.lastName}!</h1>
    </div>
  )
}

export default Success
