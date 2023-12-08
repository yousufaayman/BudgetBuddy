import { useState } from 'react'
import '../../Components/Styles/Dashboard.Module.css'
import {ContainerStyled} from '../../Components/Styles/Container.Styled'
import {GridItem} from '../../Components/Styles/GridItem'
// import {MainContent} from './DashboardMainContent'
import {NavBar} from '../../Components/AccountNavBar'
import {TopBar} from '../../Components/AccountTopBar'
import { getCookie } from '../../lib/CookieHandler'
import axios from 'axios'
import { useEffect } from 'react'
import { API_URL } from '../../lib/const'
import styles from './analysis.Module.css'

export const Analysis = () => {
    const [income, setIncome] = useState()
    const [expense, setExpense] = useState()
    const user = getCookie("__tK__");
    const userID = user.uid;
  
    const getMonthlyIncome = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/user/getTotalIncome/${userID}`);
        if (data ) {
            setIncome(data.totalIncome)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getMonthlyExpense = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/user/getTotalExpense/${userID}`);
        if (data ) {
            setExpense(data.totalExpense)
            console.log(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };



    useEffect(()=>{
        getMonthlyIncome()
        getMonthlyExpense()
    }, [])

    // MainContent("3cZUJIvnx7OqOl5uXkSGfveaLHw2")
    return (
      <ContainerStyled className="page" display="grid" gridrows="1fr 10fr" gridcolumns="2fr 10fr 0.1fr">
          <GridItem gridarea = "1 / 2 / 2 / 3" qgridarea = " 2 / 1 / 4 / 4"><TopBar pageName='Dashboard' /></GridItem>
            <GridItem gridarea = "2 / 2 / 3 / 3" qgridarea = "1 / 1 / 1 /4">
                <div className="analysis-dashboard">
                    <h1>Monthly Overview</h1>
                    <div>
                        <div>
                            <h1>Income: {income}</h1>
                        </div>
                        <div>
                            <h1>Expense: {expense}</h1>
                        </div>
                    </div>
                </div>
                
            </GridItem>
          <GridItem gridarea = "1 / 1 / 3 / 2" qgridarea = " 2 / 1 / 4 / 4"><NavBar/></GridItem>
      </ContainerStyled>
    );
  }
  
  export default Analysis;