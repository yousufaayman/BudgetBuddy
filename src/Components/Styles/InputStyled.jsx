import styled from "styled-components";
import { device } from "./devices";

export const InputStyled = styled.input`
  background-color : #670AAD;
  grid-area: ${(props) => props.gridarea};
  font-family: 'Roboto Mono';
  width: 80%;
  height: 50%;
  border: none;
  padding: 3%;
  border-radius: 0.8rem;
  color: #FFF3E2;

  &:focus{
        display: inline-block;
        box-shadow : 0 0 0 0.2rem  #7D2E68;
        border-radius: 0.4rem;
    }

    &::placeholder{
        color: #fff3e2a0;
    }

    @media ${device.laptop} { 
        width: ${(props) => props.qwidth};
        height: ${(props) => props.qheight};
        grid-area: ${(props) => props.qgridarea};
  }
`