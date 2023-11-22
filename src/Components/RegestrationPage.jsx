import {ContainerStyled} from './Styles/Container.Styled'
import {RegestrationForm} from './RegestrationForm'
import { RegNavBar } from './RegNavbar';
import {GridItem} from './Styles/GridItem'
import './Styles/RegestrationPage.css'

export const RegestrationPage = () => {
  return (
    <ContainerStyled className="page" display="grid" gridrows="1fr 4fr" gridcolumns="2fr 4fr 2fr">
        <GridItem gridarea = "1 / 1 / 1 / 4" qgridarea = "1 / 1 / 1 /4"><RegNavBar/></GridItem>
        <GridItem gridarea = "2 / 2 / 3 / 3" qgridarea = " 2 / 1 / 4 / 4"><RegestrationForm /></GridItem>
    </ContainerStyled>
  );
}

export default RegestrationPage;
