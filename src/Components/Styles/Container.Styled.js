import styled from 'styled-components';

export const ContainerStyled = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.display};
  place-items: ${(props) => props.placeItems};
  grid-template-rows: ${(props) => props.gridRows};
  grid-template-columns: ${(props) => props.gridColumns};
`;

ContainerStyled.defaultProps = {
  margin: '0',
  padding: '0',
  width: '100vw',
  height: '100vh',
  display: 'grid',
  placeItems: 'center',
};

// Define an array of prop names that should be passed to the DOM element
const validProps = ['margin', 'padding', 'width', 'height', 'display', 'placeItems', 'backgroundColor'];

// Use the shouldForwardProp prop to filter valid props
const ContainerStyledFiltered = styled(ContainerStyled).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => validProps.includes(prop) || defaultValidatorFn(prop),
});