import styled from "styled-components";
import { device } from "./devices";

export const LabelStyled = styled.label`
  color : #E74646;
  font-size: 2em;
  grid-column: ${(props) => props.gridcolumn};
  display: grid;
  grid-row: ${(props) => props.gridrow};
  font-family: 'Open Sans';

      @media ${device.laptop} { 
        font-size: 2rem;
  }
`