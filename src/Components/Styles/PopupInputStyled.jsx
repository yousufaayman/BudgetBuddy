import styled from "styled-components";
import { device } from "./devices";

export const PopupInputStyled = styled.input`
  background-color : #BBB9BB;
  grid-area: ${(props) => props.gridarea};
  font-family: 'Roboto Mono';
  width: 80%;
  height: 50%;
  border: none;
  padding: 2%;
  border-radius: 0.3rem;
  color: #670AAD;
  
  &:focus{
        display: inline-block;
        box-shadow : 0 0 0 0.2rem  #7D2E68;
        border-radius: 0.4rem;
    }

    &::placeholder{
        color: #670AADa0;
    }

    @media ${device.laptop} { 
        width: ${(props) => props.qwidth};
        height: ${(props) => props.qheight};
        grid-area: ${(props) => props.qgridarea};
  }
`