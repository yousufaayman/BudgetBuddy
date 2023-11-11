import {ContainerStyled} from './components/Styles/Container.Styled'
import {RegestrationForm} from './components/RegestrationForm'
import { RegNavBar } from './components/RegNavbar';
import {GridITem, GridItem} from './components/Styles/GridItem'

function App() {
  return (
    <ContainerStyled display="grid" gridRows="1fr 4fr" gridColumns="2fr 4fr 2fr">
        <GridItem gridArea = "1 / 1 / 1 /4" QgridArea = "1 / 1 / 1 /4"><RegNavBar/></GridItem>
        <GridItem gridArea = "2 / 2 / 3 / 3" QgridArea = " 2 / 1 / 4 / 4"><RegestrationForm /></GridItem>
    </ContainerStyled>
  );
}

export default App;
