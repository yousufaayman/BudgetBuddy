import React from 'react'
import './Styles/RegestrationForm.css'
import { LabelStyled } from '../Shared Components/Styles/LabelStyled';
import { InputStyled } from '../Shared Components/Styles/InputStyled';
import { ButtonStyled } from '../Shared Components/Styles/ButtonStyled';

export const FormPersonalDetails = ({nextStep, handleChange, values, errorHandle, fvalues}) => {

  const Continue = e => {
    e.preventDefault();
    nextStep()
  }
  
  return (
    <div className='sign-up-form'>
             
        <LabelStyled gridcolumn= "1 / 2" gridrow=" 1 / 2" qgridcolumn= "2 / 3" qgridrow=" 2 / 3">First Name</LabelStyled>
        <InputStyled
            gridarea= "1 / 2 / 2 / 3"
            qgridarea= "3 / 2 / 4 / 3"  
            type="text" 
            placeholder={fvalues.firstName} 
            value={values.firstName} 
            onChange={handleChange('firstName')
          }
            
          />

        <LabelStyled gridcolumn= "1 / 2" gridrow=" 2 / 3" qgridcolumn= "2 / 3" qgridrow=" 4 / 5">Last Name</LabelStyled>
        <InputStyled
            gridarea= "2 / 2 / 3 / 3"        
            qgridarea= "5 / 2 / 6 / 3"  
            type="text" 
            placeholder={fvalues.lastName} 
            value={values.lastName} 
            onChange={handleChange('lastName')}
          />
        
        <LabelStyled gridcolumn= "1 / 2" gridrow=" 3 / 4" qgridcolumn= "2 / 3" qgridrow=" 6 / 7">Email</LabelStyled>
        <InputStyled
            gridarea= "3 / 2 / 4 / 3"        
            qgridarea= "7 / 2 / 8 / 3"  
            type="text" 
            placeholder={fvalues.email}  
            value={values.email} 
            onChange={handleChange('email')}
            
          />

        <LabelStyled gridcolumn= "1 / 2" gridrow=" 4 / 5" qgridcolumn= "2 / 3" qgridrow=" 8 / 9">Password</LabelStyled>
        <InputStyled
            gridarea= "4 / 2 / 5 / 3"        
            qgridarea= "9 / 2 / 10 / 3" 
            type="password" 
            placeholder={fvalues.password} 
            value={values.password}
            onChange={handleChange('password')}
          />

        <LabelStyled gridcolumn= "1 / 2" gridrow=" 5 / 6" qgridcolumn= "2 / 3" qgridrow=" 10 / 11">Confirm Password</LabelStyled>
        <InputStyled
            gridarea= "5 / 2 / 6 / 3"
            qgridarea= "11 / 2 / 12 / 3" 
            type="password" 
            placeholder={fvalues.check_password}  
            value={values.check_password} 
            onChange={handleChange('check_password')
          }
            
          />

        <ButtonStyled 
          fsize = "130%" 
          color= "#FFF3E2" 
          bgcolor1 = "#ea4e33" 
          bgcolor2 = "#ad0b82" 
          height= "70%" 
          width= "50%" 
          qmargin = "5%"
          gridarea= "6 / 1 / 7 / 3"
          qgridarea= "13 / 2 / 14 / 3" 
          onClick={ Continue }
          >
            Next
          </ButtonStyled>
          <p className="errors">{errorHandle}</p>
    </div>
  )
}

export default FormPersonalDetails
