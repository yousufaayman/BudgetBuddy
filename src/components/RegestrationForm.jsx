import React, { Component } from 'react'
import {FormPersonalDetails} from './FormPersonalDetails'
import {FormUserDetails} from './FormUserDetails'
import {Confirm} from './Confirm'
import {Success} from './Success'

export class RegestrationForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        currency: '',
        avgIncome: 0
    }

    nextStep = () =>{
        const {step} = this.state;
        this.setState({
            step : step + 1
        });
    }

    prevStep = () =>{
        const {step} = this.state;
        this.setState({
            step : step - 1
        });
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    render() {

        const {step} = this.state;
        const {firstName, lastName, email, password, country, currency, avgIncome} = this.state;
        const values = {}

        switch(step){

            case 1:
                return (
                    <FormPersonalDetails 
                    nextStep = {this.nextStep}
                    handleChange = {this.handleChange}
                    values = {values}
                    />
                );

            case 2:
                return (
                    <FormUserDetails 
                    prevStep = {this.prevStep}
                    nextStep = {this.nextStep}
                    handleChange = {this.handleChange}
                    values = {values}
                    />
                );

            case 3:
                return (
                    <Confirm 
                    prevStep = {this.prevStep}
                    nextStep = {this.nextStep}
                    values = {values}
                    />
                );

            case 4:
                return (
                    <Success/>
                );

            default:
                
        }
    }
}

export default RegestrationForm
