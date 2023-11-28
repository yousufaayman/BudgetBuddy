import './Styles/DashboardMainContent.Module.css'
import { TbPigMoney } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

export const MainContent = () => {
    return (
      <div className="MainContent">
          <div className="main-features">
            <div className="balance"><TbPigMoney/>Real-Time Balance: </div>
            <button className="add-income"><GiReceiveMoney/>Add Income</button>
            <button className="add-expense"><GiPayMoney/>Add Expense</button>
          </div>
      </div>
    );
  }
  
  export default MainContent;