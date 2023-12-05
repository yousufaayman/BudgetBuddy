import { ContainerStyled } from "./Styles/Container.Styled"
import { LoginForm } from "./LoginForm"
import { GridItem } from "./Styles/GridItem";
import { LandingTopBar } from "./TopBar"; 
import { LandingContent } from "./LandingContent";
import './Styles/LandingPage.css'

export const LandingPage = () =>  {
  return (
    <ContainerStyled className="page" width="100%" height="100%" display = "grid" gridColumns= "4fr 8fr 1fr" gridRows= "2fr 6fr" QLgridRows="1fr 5fr 1fr" QLgridColumns="1fr 3fr 2fr 1fr" QMgridRows="1fr 5fr 1fr" QMgridColumns="1fr 2fr 2f">
        <GridItem gridArea = "1 / 1 / 2 / 4" qgridArea = " 1 / 1 / 2 / 4"><LandingTopBar/></GridItem>
        <GridItem gridArea = "2 / 1 / 3 / 2" qgridArea = "3 / 1 / 4 / 4"><LoginForm /></GridItem>
        <GridItem gridArea = "2 / 2 / 3 / 4" qgridArea = " 2 / 1 / 3 / 4"><LandingContent/></GridItem>
    </ContainerStyled>
  );
}

export default LandingPage;
