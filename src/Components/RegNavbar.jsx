import React from 'react';
import './Styles/RegNavbar.Module.css'
import { ButtonStyled } from './Styles/ButtonStyled';

export function RegNavBar() {

    return (
        <div className="nav-bar">\
            <img/>
            <h1 className="budget-buddy">Budget Buddy</h1>
            <ButtonStyled>Login</ButtonStyled>
        </div>
    )
};

export default RegNavBar