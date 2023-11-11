import React, { Component } from 'react';
import { FormPersonalDetails } from './FormPersonalDetails';
import { FormUserDetails } from './FormUserDetails';
import { Confirm } from './Confirm';
import { Success } from './Success';
import { validateEmail, validatePasswords } from './InputValidations';

export class RegestrationForm extends Component {
    state = {
        step: 1,
        errorHandle:'',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        check_password: '',
        country: '',
        currency: '',
        avgIncome: 0
    };

    nextStep = () => {
        const { step, email, password, check_password } = this.state;
        
        if(step == 1){
            try {
                const emailResult = validateEmail(email)
                const passwordResult = validatePasswords(password, check_password);
                if (passwordResult && emailResult) {
                    this.setState({
                        step: step + 1
                    });   
                }
            } catch (error) {
                this.setState({ errorHandle: error.message });
            }
        }else{
            this.setState({
                step: step + 1
            });  
        }
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };


    render() {

        const { step, errorHandle } = this.state;
        const finalValues = this.state;
        const { firstName, lastName, email, password, check_password, country, currency, avgIncome } = this.state;
        const values = {};
        
        switch (step) {

            case 1:
                return (
                    <FormPersonalDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        errorHandle={errorHandle} />
                );

            case 2:
                return (
                    <FormUserDetails
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values} />
                );

            case 3:
                return (
                    <Confirm
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        values={finalValues} />
                );

            case 4:
                return (
                    <Success />
                );

            default:

        }
    }
}
