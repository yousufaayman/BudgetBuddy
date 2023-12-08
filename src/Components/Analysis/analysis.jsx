import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../Services/UserContext";
import "./analysis.Module.css";

export const Analysis = () => {
  const [income, setIncome] = useState();
  const [expense, setExpense] = useState();
  const { user, walletId } = useContext(UserContext);

  const getMonthlyIncome = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/user/getTotalIncome/${user}/${walletId}`,
      );
      if (data) {
        setIncome(data.totalIncome);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMonthlyExpense = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/user/getTotalExpense/${user}/${walletId}`,
      );
      if (data) {
        setExpense(data.totalExpense);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMonthlyIncome();
    getMonthlyExpense();
  }, []);

  return (
    <div className="analysis-dashboard">
      <div>
        <p>Income: {income}</p>
        <p>Expense: {expense}</p>
      </div>
    </div>
  );
};

export default Analysis;
