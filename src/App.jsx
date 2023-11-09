import {ContainerStyled} from './components/Styles/Container.Styled'
import {RegestrationForm} from './components/RegestrationForm'

function App() {
  return (
    <ContainerStyled display="grid" placeItems="center">
        <RegestrationForm />
    </ContainerStyled>
  );
}

export default App;
