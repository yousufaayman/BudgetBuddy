import styled from "styled-components";
import { device } from "./devices";

export const PopupInputStyled = styled.input`
  background-color: #bbb9bb;
  grid-area: ${(props) => props.gridarea};
  font-family: "Roboto Mono";
  width: 80%;
  height: 50%;
  border: none;
  padding: 2%;
  border-radius: 0.3rem;
  color: #7b0dcf;

  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #7d2e68;
    border-radius: 0.4rem;
  }

  &::placeholder {
    color: #7b0dcfa0;
  }

  @media ${device.laptop} {
    width: ${(props) => props.qwidth};
    height: ${(props) => props.qheight};
    grid-area: ${(props) => props.qgridarea};
  }
`;
