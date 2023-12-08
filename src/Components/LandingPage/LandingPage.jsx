import { ContainerStyled } from "../Shared Components/Styles/Container.Styled";
import { LoginForm } from "./LoginForm";
import { GridItem } from "../Shared Components/Styles/GridItem";
import { LandingTopBar } from "./TopBar";
import { LandingContent } from "./LandingContent";
import "./Styles/LandingPage.css";

export const LandingPage = () => {
  return (
    <ContainerStyled
      className="landing-page"
      display="grid"
      gridcolumns="4fr 8fr 1fr"
      gridrows="2fr 6fr"
      qlgridRows="1fr 5fr 1fr"
      qlgridColumns="1fr 3fr 2fr 1fr"
      qmgridRows="1fr 5fr 1fr"
      qmgridColumns="1fr 2fr 2f"
    >
      <GridItem gridarea="1 / 1 / 2 / 4" qgridarea=" 1 / 1 / 2 / 4">
        <LandingTopBar />
      </GridItem>
      <GridItem gridarea="2 / 1 / 3 / 2" qgridarea="3 / 1 / 4 / 4">
        <LoginForm />
      </GridItem>
      <GridItem gridarea="2 / 2 / 3 / 4" qgridarea=" 2 / 1 / 3 / 4">
        <LandingContent />
      </GridItem>
    </ContainerStyled>
  );
};

export default LandingPage;
