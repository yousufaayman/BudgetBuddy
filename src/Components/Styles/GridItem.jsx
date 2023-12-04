import styled from 'styled-components';
import { device } from "./devices";

export const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: ${(props) => props.gridarea};

    @media ${device.laptop} { 
        grid-area: ${(props) => props.qgridarea};
  }

  @media ${device.tablet}{ 
        grid-area: ${(props) => props.qtgridarea};
  }
  
`;
