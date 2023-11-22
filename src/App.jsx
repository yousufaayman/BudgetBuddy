import {ContainerStyled} from './Components/Styles/Container.Styled'
import {GridItem} from './Components/Styles/GridItem'


function App() {
  return (
    <ContainerStyled display="grid" gridrows="1fr" gridcolumns="2fr 6fr" width="100vw" height="100vh">
      <GridItem gridarea = "1 / 1 / 1 / 4" qgridarea = "1 / 1 / 1 /4"></GridItem>
    </ContainerStyled>
  );
}

export default App;
