import styled from 'styled-components';

export const Heading = styled.p`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.fontColor};
  font-family: ${(props) => props.fontFamily};
  text-align: ${(props) => props.textSlign};
  text-shadow: ${(props) => props.textShadow};
`;