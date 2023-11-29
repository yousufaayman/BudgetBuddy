import './Styles/DashboardNavBar.Module.css'
import React, { useState } from 'react';

export const NavBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
      setCollapsed(!collapsed);
    };

    return (
        <div className="nav-bar" collapsed={collapsed}>
            <ul className="nav-menu">
                <li className='menu-item'><a href="#" className='menu-link'>Dashboard</a></li>
                <li className='menu-item'><a href="#" className='menu-link'>Home</a></li>
                <li className='menu-item'><a href="#" className='menu-link'>Home</a></li>
            </ul>
        </div>
    );
  }
  
  export default NavBar;