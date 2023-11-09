import styled from 'styled-components';
import { device } from './devices';

export const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: ${(props) => props.gridArea};

    @media ${device.laptop} { 
        grid-area: ${(props) => props.QgridArea};
  }
`;