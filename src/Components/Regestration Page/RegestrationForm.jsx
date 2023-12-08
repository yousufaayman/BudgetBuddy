import React, { Component } from "react";
import { FormPersonalDetails } from "./FormPersonalDetails";
import { FormUserDetails } from "./FormUserDetails";
import { Confirm } from "./Confirm";
import { Success } from "./Success";
import { SignInOption } from "./SignInOption";
import { validateEmail, validatePasswords } from "./InputValidations";
import { handleGoogleSignUp } from "./HandleGoogleSignUp";
import axios from "axios";
import Cookies from "js-cookie";

export class RegestrationForm extends Component {
  state = {
    step: 0,
    errorHandle: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    check_password: "",
    country: "",
    currency: "",
    avgIncome: 0,
    userExists: false,
    loading: true,
    googleAccount: false,
    uid: "",
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/signup/email",
        this.state,
      );

      if (response.status === 201) {
        if (response.data?.success) {
          const responseUserId = response.data.user;
          this.setState({ uid: responseUserId });
          this.nextStep();
        } else {
          console.error("Signup failed. No success indication in response.");
          this.resetState();
        }
      } else {
        console.error("Unexpected status code:", response.status);
        this.resetState();
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      }
      this.resetState();
    }
  };

  checkUserExistence = async () => {
    const { email } = this.state;

    try {
      const response = await axios.post(
        "http://localhost:3002/api/checkUserExistence",
        { email },
      );

      const { exists } = response.data;

      this.setState({ userExists: exists, loading: false });

      return exists;
    } catch (error) {
      console.error("Error checking user existence:", error);
      this.setState({
        error: "An error occurred while checking user existence.",
        loading: false,
      });
      throw error;
    }
  };

  nextStep = async () => {
    const { step, firstName, lastName, email, password, check_password } =
      this.state;

    if (step === 1) {
      if (firstName === "" || lastName === "") {
        this.setState({ errorHandle: "Please input your first and Last Name" });
        return;
      }

      const emailResult = validateEmail(email);
      const passwordResult = validatePasswords(password, check_password);
      const userExists = await this.checkUserExistence();

      if (!emailResult || !passwordResult) {
        this.setState({ errorHandle: "Invalid email or password" });
        return;
      }

      if (userExists) {
        this.setState({ errorHandle: "User already exists" });
      } else {
        this.setState((prevState) => ({ step: prevState.step + 1 }));
      }
    } else {
      this.setState({
        step: step + 1,
      });
    }
  };

  googleSignUp = async () => {
    const { step } = this.state;
    const userData = await handleGoogleSignUp();

    if (userData.error) {
      console.error("Google Sign Up Failed Due to unexpected error");
    } else {
      const googleResponseUserId = userData.uid;
      this.setState(
        {
          googleAccount: true,
          step: step + 2,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          uid: googleResponseUserId,
        },
        async () => {
          const userIsRegestired = await this.checkUserExistence();

          if (await userIsRegestired) {
            this.resetState();
            alert("This user already exists! Try Logging in :)");
          }
        },
      );
    }
  };

  googleSignUpCompletion = async () => {
    const { uid } = this.state;

    try {
      await axios.post(
        `http://localhost:3002/signup/google/${uid}`,
        this.state,
      );
      this.nextStep();
    } catch (error) {
      alert(error);
      this.resetState();
    }
  };

  removeUser = async () => {
    const { uid } = Cookies.get("uid");

    try {
      const response = await axios.post(`http://localhost:3002/delete/${uid}`);

      if (response.ok) {
        console.log("User deleted successfully");
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  resetState = async () => {
    await this.removeUser();

    this.setState(
      {
        step: 0,
        errorHandle: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        check_password: "",
        country: "",
        currency: "",
        avgIncome: 0,
        userExists: false,
        loading: true,
        googleAccount: false,
      },
      () => {},
    );
  };

  render() {
    const { step, errorHandle, googleAccount } = this.state;
    const finalValues = this.state;
    const values = {};
    let returnOption;
    let signUpMethod;

    switch (step) {
      case 0:
        return (
          <SignInOption
            nextStep={this.nextStep}
            googleNextStep={this.googleSignUp}
          />
        );

      case 1:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            errorHandle={errorHandle}
            fvalues={finalValues}
          />
        );

      case 2:
        if (googleAccount) {
          returnOption = this.resetState;
        } else {
          returnOption = this.prevStep;
        }

        return (
          <FormUserDetails
            prevStep={returnOption}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            fvalues={finalValues}
          />
        );

      case 3:
        if (finalValues.country === "") {
          finalValues.country = "Egypt";
        }

        if (finalValues.currency === "") {
          finalValues.currency = "EGP";
        }

        if (finalValues.avgIncome === null) {
          finalValues.avgIncome = 0;
        }

        if (googleAccount) {
          signUpMethod = this.googleSignUpCompletion;
        } else {
          signUpMethod = this.handleSignup;
        }

        return (
          <Confirm
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={finalValues}
            handleSignUp={signUpMethod}
          />
        );

      case 4:
        return <Success values={finalValues} />;

      default:
    }
  }
}
