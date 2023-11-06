import { ContainerStyled } from "./Components/Styles/Container.Styled"
import { LoginForm } from "./Components/LoginForm"
import { GridItem } from "./Components/Styles/GridItem";
import { LandingTopBar } from "./Components/TopBar"; 
import { LandingContent } from "./Components/LandingContent";

function App() {
  return (
    <ContainerStyled display = "grid" gridColumns= "4fr 8fr 1fr" gridRows= "2fr 4fr 2fr">
        <GridItem gridArea = "2 / 1 / 3 / 2" QgridArea = "3 / 1 / 4 / 4"><LoginForm /></GridItem>
        <GridItem gridArea = "1 / 1 / 2 / 4" QgridArea = " 1 / 1 / 2 / 4"><LandingTopBar/></GridItem>
        <GridItem gridArea = "2 / 2 / 3 / 4" QgridArea = " 2 / 1 / 3 / 4"><LandingContent/></GridItem>
    </ContainerStyled>
  );
}

export default App;
