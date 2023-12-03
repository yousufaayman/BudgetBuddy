import './Styles/Dashboard.Module.css'
import {ContainerStyled} from './Styles/Container.Styled'
import {GridItem} from './Styles/GridItem'
import {MainContent} from './DashboardMainContent'
import {NavBar} from './AccountNavBar'
import {TopBar} from './AccountTopBar'

export const Dashboard = () => {
    MainContent("3cZUJIvnx7OqOl5uXkSGfveaLHw2")
    return (
      <ContainerStyled className="page" display="grid" gridrows="1fr 10fr" gridcolumns="2fr 10fr 0.1fr">
          <GridItem gridarea = "1 / 2 / 2 / 3" qgridarea = " 2 / 1 / 4 / 4"><TopBar pageName='Dashboard' /></GridItem>
          <GridItem gridarea = "2 / 2 / 3 / 3" qgridarea = "1 / 1 / 1 /4"><MainContent/></GridItem>
          <GridItem gridarea = "1 / 1 / 3 / 2" qgridarea = " 2 / 1 / 4 / 4"><NavBar/></GridItem>
      </ContainerStyled>
    );
  }
  
  export default Dashboard;