import styled from "styled-components";

export const InputStyled = styled.input`
  background-color : #FFF3E2;
  grid-column: 2 / 2;
  grid-rows: ${(props) => props.rows};
  font-family: 'Roboto Mono';
  width: 80%;
  height: 50%;
  border: none;
  padding: 2%;
  border-radius: 5%;

  &:focus{
        display: inline-block;
        box-shadow : 0 0 0 0.2rem  #ff8400;
        border-radius: 0.4rem;
    }

    &::placeholder{
        color: #fe2a00;
    }
`