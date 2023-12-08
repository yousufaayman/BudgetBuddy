import React, { useState, useEffect, useContext } from "react";
import { ContainerStyled } from "../Shared Components/Styles/Container.Styled";
import { GridItem } from "../Shared Components/Styles/GridItem";
import { DashboardMainContent } from "./DashboardMainContent";
import { NavBar } from "../Shared Components/AccountNavBar";
import { TopBar } from "../Shared Components/AccountTopBar";
import "./Styles/Dashboard.Module.css";
import { device } from "../Shared Components/Styles/devices";

export const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ContainerStyled
      className="dashboard-page"
      display="grid"
      gridrows="1fr 10fr"
      gridcolumns="2fr 10fr 0.1fr"
      ql_height="100vh"
      ql_width="100vw"
      qm_height="100vh"
      qm_width="100vw"
    >
      <GridItem gridarea="1 / 2 / 2 / 3" qtgridarea="1 / 2 / 2 / 3">
        <TopBar pageName="Dashboard" />
      </GridItem>
      <GridItem gridarea="2 / 2 / 3 / 3" qtgridarea="2 / 1 / 3 / 4">
        <DashboardMainContent />
      </GridItem>
      <GridItem gridarea="1 / 1 / 3 / 2" qtgridarea="1 / 1 / 2 / 2">
        <NavBar
          collapsed={windowWidth <= device.tablet}
          activePage="dashboard"
        />
      </GridItem>
    </ContainerStyled>
  );
};

export default Dashboard;
