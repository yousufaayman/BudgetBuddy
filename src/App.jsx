import {ContainerStyled} from './Components/Styles/Container.Styled'
import {RegestrationForm} from './Components/RegestrationForm'
import { RegNavBar } from './Components/RegNavbar';
import {GridITem, GridItem} from './Components/Styles/GridItem'

function App() {
  return (
    <ContainerStyled display="grid" gridRows="1fr 4fr" gridColumns="2fr 4fr 2fr">
        <GridItem gridArea = "1 / 1 / 1 / 4" QgridArea = "1 / 1 / 1 /4"><RegNavBar/></GridItem>
        <GridItem gridArea = "2 / 2 / 3 / 3" QgridArea = " 2 / 1 / 4 / 4"><RegestrationForm /></GridItem>
    </ContainerStyled>
  );
}

export default App;
