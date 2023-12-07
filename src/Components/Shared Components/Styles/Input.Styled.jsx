import styled from "styled-components";

/**
 * Input Button component using styled ocmponents.
 *
 * @returns {JSX.Element} The rendered RegNavBar component.
 */

export default function Input({ type, placeholder }) {
  return <StyledInput type={type} placeholder={placeholder} />;
}

const StyledInput = styled.input`
  background: #ffe5ca;
  box-shadow: 0.2rem 0.2rem 0.6em 0 #ffc3c3;
  border-radius: 0.3rem;
  width: 70%;
  height: 5%;
  padding: 1rem;
  border: none;
  outline: none;
  margin: 0.2rem 0 0.5rem 0;
  font-family: ${(props) => props.fontFamily || "'Roboto Mono', monospace;"};
  font-size: ${(props) => props.fontSize || "1rem"};

  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #ffe5ca;
    border-radius: 0.4rem;
  }

  &::placeholder {
    color: #670aad;
  }
`;
