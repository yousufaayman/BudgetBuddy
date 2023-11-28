import './Styles/DashboardNavBar.Module.css'
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

export const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
      setCollapsed(!collapsed);
    };

    return (
        <Sidebar collapsed={collapsed}>
            <Menu>
                <MenuItem>Home</MenuItem>
            </Menu>
        </Sidebar>
    );
  }
  
  export default Navbar;