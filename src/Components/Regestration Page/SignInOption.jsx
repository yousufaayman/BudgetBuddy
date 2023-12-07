import React from "react";
import "./Styles/RegestrationForm.css";
import { ButtonStyled } from "../Shared Components/Styles/ButtonStyled";
import { GrGoogle } from "react-icons/gr";
import { GrMail } from "react-icons/gr";

export const SignInOption = ({ nextStep, googleNextStep }) => {
  const standeredSignUP = (e) => {
    e.preventDefault();
    nextStep();
  };

  const googleSignUP = (e) => {
    e.preventDefault();
    googleNextStep();
  };

  return (
    <div className="sign-up-options">
      <ButtonStyled
        fsize="100%"
        color="white"
        bgcolor1="#FFF3E2"
        bgcolor2="#670AAD"
        height="70%"
        width="80%"
        gridarea="2 / 2 / 3 / 3"
        qgridarea="2 / 2 / 3 / 3"
        qfsize="90%"
        onClick={standeredSignUP}
      >
        Sign Up using Email{" "}
        <GrMail style={{ margin: "10px" }} size={25} color="white" />
      </ButtonStyled>

      <ButtonStyled
        fsize="100%"
        color="white"
        bgcolor1="#DB4437"
        bgcolor2="#F4B400"
        height="70%"
        width="80%"
        gridarea="4 / 2 / 5 / 3"
        qgridarea="4 / 2 / 5 / 3"
        qfsize="90%"
        onClick={googleSignUP}
      >
        Sign Up using Google{" "}
        <GrGoogle style={{ margin: "10px" }} size={25} color="white" />
      </ButtonStyled>
    </div>
  );
};
