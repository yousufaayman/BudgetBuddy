import React, { Component, useEffect } from 'react';
import { FormPersonalDetails } from './FormPersonalDetails';
import { FormUserDetails } from './FormUserDetails';
import { Confirm } from './Confirm';
import { Success } from './Success';
import { SignInOption } from './SignInOption';
import { validateEmail, validatePasswords } from './InputValidations';
import axios from 'axios';

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
          avgIncome: 0,
          userExists: false, 
          loading: true
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
      
      handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3002/signup', this.state);
            response = true
          } catch (error) {
              if (error.response && error.response.data && error.response.data.error) {
                  alert('An unexpected error occurred. Please try again later.');
                }
          };
        
      };

    checkUserExistence = async () => {
        const { email } = this.state;
      
        try {
          const response = await axios.post('http://localhost:3002/api/checkUserExistence', { email });
          const { exists } = response.data;
      
          // Use a callback function with setState to ensure state is updated before proceeding
          this.setState({ userExists: exists, loading: false });
      
          return exists; // Return the result of user existence check
      
        } catch (error) {
          console.error('Error checking user existence:', error);
          this.setState({ error: 'An error occurred while checking user existence.', loading: false });
          throw error; // Rethrow the error for the caller to handle
        }
      };
      
    nextStep = async () => {
      const { step, firstName, lastName, email, password, check_password } = this.state;
    
      if (step === 1) {
          if(firstName == "" || lastName == ""){
            this.setState({ errorHandle: "Please input your first and Last Name"});
          }else{
            try {
              const emailResult = validateEmail(email);
              const passwordResult = validatePasswords(password, check_password);
              
              const userExists = await this.checkUserExistence();
        
              if (passwordResult && emailResult) {
                if (userExists) {
                  this.setState({ errorHandle: "User already exists" });
                } else {
                  this.setState(prevState => ({ step: prevState.step + 1 }));
                }
              }
            } catch (error) {
              this.setState({ errorHandle: error.message });
            }
          }
      }else {
        this.setState({
          step: step + 1
        });
      }
    };

    render() {

        const { step, errorHandle } = this.state;
        const finalValues = this.state
        const userinfo = [this.avgIncome, this.country, this.currency, this.firstName, this.lastName]
        const { firstName, lastName, email, password, check_password, country, currency, avgIncome } = this.state;
        const values = {};
        
        switch (step) {

          case 0:
            return (
                
                <SignInOption
                    nextStep={this.nextStep}
                    googleNextStep={this.googleNextStep}
                    
                     />
            );

            case 1:
                return (
                    
                    <FormPersonalDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        errorHandle={errorHandle}
                        fvalues={finalValues} />
                );

            case 2:
                return (
                    <FormUserDetails
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        fvalues={finalValues} />
                );

            case 3:
                
                if(finalValues.country == ""){
                    finalValues.country = "Egypt"
                }

                if(finalValues.currency == ""){
                    finalValues.currency = "EGP"
                }

                if(finalValues.avgIncome == ""){
                    finalValues.avgIncome = 0
                }

                return (
                    <Confirm
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        values={finalValues} 
                        handleSignUp={this.handleSignup}
                        />
                        
                );
                

            case 4:
                return (
                    <Success />
                );

            default:

        }
    }
}
