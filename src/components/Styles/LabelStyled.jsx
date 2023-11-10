import styled from "styled-components";

export const LabelStyled = styled.label`
  color : #E74646;
  font-size: 2em;
  grid-column: 1 / 1;
  display: grid
  grid-rows: ${(props) => props.rows};
  font-family: 'Open Sans';
`