import React from 'react';
import './LoginForm.Module.css'
import { GrGoogle } from "react-icons/gr";

export function LoginForm() {
    return (
        <div className="formdiv">
            <h1 className="main-heading">Login</h1>

            <div className="input-container">
                <form className="input-container">
                    <input type="text" placeholder = "Email" className="input" />
                    <input type="Password" placeholder = "Password" className="input" />
                    <button className="login-button">Login</button>
                </form>
            </div>
            
            <div className="login-with-container">
                <h5 className="login-option-text">Or Login With</h5>
                <hr className="horizontal-rule"/>
                <GrGoogle size={50} color='#FFE5CA'/>
            </div>

            <div className="login-help-container">
                <a className="hyperlink">Forgot Passowrd?</a>
                <a className="hyperlink">No Account? Sign up!</a>
            </div>

        </div>
    )
};