import { ContainerStyled } from "./Components/Styles/Container.Styled"
import { LoginForm } from "./Components/LoginForm"
import { GridItem } from "./Components/Styles/GridItem";

function App() {
  return (
    <ContainerStyled display = "grid" gridColumns= "4fr 8fr 1fr" gridRows= "2fr 4fr 2fr">
        <GridItem gridArea = "2 / 1 / 3 / 2" QgridArea = "2 / 2 / 3 / 3"><LoginForm /></GridItem>
    </ContainerStyled>
  );
}

export default App;
