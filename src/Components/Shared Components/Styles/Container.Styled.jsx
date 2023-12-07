import styled from "styled-components";
import { device } from "./devices";

export const ContainerStyled = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.display};
  place-items: ${(props) => props.placeitems};
  grid-template-rows: ${(props) => props.gridrows};
  grid-template-columns: ${(props) => props.gridcolumns};

  @media ${device.laptop} {
    width: 100%;
    height: 100%;
    grid-template-columns: ${(props) => props.qlgridRows};
    grid-template-rows: ${(props) => props.qlgridColumns};
  }

  @media ${device.mobileL} {
    width: 100%;
    height: 100%;
    grid-template-columns: ${(props) => props.qmgridRows};
    grid-template-rows: ${(props) => props.qmgridColumns};
  }
`;

ContainerStyled.defaultProps = {
  margin: "0",
  padding: "0",
  width: "100vw",
  height: "100vh",
  display: "grid",
};
