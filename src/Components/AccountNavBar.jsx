import './Styles/AccountNavBar.Module.css'
import React, { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";

export const NavBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
      setCollapsed(!collapsed);
    };

    return (
        <div className="nav-bar" collapsed={collapsed}>
            <ul className="nav-menu">
                <li><img className='account-bb-logo' src="BudgetBuddyLogo.png" alt='budget buddy logo'/></li>
                <li className='menu-item'><a href="#" className='menu-link' id='active-page'><LuLayoutDashboard className='link-icon'/> Dashboard</a></li>
                <li className='menu-item'><a href="#" className='menu-link'><AiOutlineTransaction className='link-icon'/> Transactions</a></li>
            </ul>
        </div>
    );
  } 
  
  export default NavBar;