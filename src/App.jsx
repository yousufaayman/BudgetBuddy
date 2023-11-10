import {ContainerStyled} from './components/Styles/Container.Styled'
import {RegestrationForm} from './components/RegestrationForm'
import { RegNavBar } from './components/RegNavbar';

function App() {
  return (
    <ContainerStyled display="grid" gridRows="1fr 4fr" gridColumns="2fr 4fr 2fr">
        <RegNavBar/>
        <RegestrationForm />
    </ContainerStyled>
  );
}

export default App;
