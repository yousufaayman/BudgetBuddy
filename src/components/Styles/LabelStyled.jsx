import styled from "styled-components";
import { device } from "./devices";

export const LabelStyled = styled.label`
  color : #E74646;
  font-size: 2em;
  grid-column: 1 / 1;
  display: grid;
  grid-row: ${(props) => props.rows};
  font-family: 'Open Sans';

      @media ${device.laptop} { 
        font-size: 2rem;
  }
`