import { ButtonStyled } from "./Components/Styles/Button.Styled";
import { ContainerStyled } from "./Components/Styles/Container.Styled"
import { Heading } from "./Components/Styles/Heading.Styled"

function App() {
  return (
    <ContainerStyled gridRows="1fr" gridColumns="1fr 4fr 1fr">

      <Heading fontSize="8vw" fontColor="#E74646" fontFamily="'Open Sans', sans-serif;" textAlign="center" textShadow="0.5vw 0.5vw 0.4vw #FA9884">
        Budget Buddy
      </Heading>

      <ButtonStyled >Click me</ButtonStyled>

      <ButtonStyled>Click me</ButtonStyled>

    </ContainerStyled>
  );
}

export default App;
