import styled from 'styled-components';

export const ButtonStyled = styled.button`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.fontColor};
  font-family: ${(props) => props.fontFamily};
  text-align: ${(props) => props.textAlign};
  background: linear-gradient(45deg, #FF5733, #FFA06A); /* Gradient colors */
  border: none; /* Remove the button border */
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  outline: none; /* Remove the outline when clicked */
  `;