import styled from "styled-components";
import { device } from "./devices";

export const LabelStyled = styled.label`
  color : #670AAD;
  font-size: 2em;
  grid-column: ${(props) => props.gridcolumn};
  display: grid;
  grid-row: ${(props) => props.gridrow};
  font-family: 'Open Sans';

      @media ${device.laptop} { 
        font-size: 1.5rem;
        grid-column: ${(props) => props.qgridcolumn};
        display: grid;
        grid-row: ${(props) => props.qgridrow};
  }
`