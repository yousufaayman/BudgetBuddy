import styled from "styled-components";

export const LabelStyled = styled.label`
  color : #FFF3E2;
  font-size: 100%;
  grid-column: 1 / 1;
  display: grid
  grid-rows: ${(props) => props.rows};
  font-family: 'Open Sans';
`