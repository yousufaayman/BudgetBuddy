import React, {useState, useEffect, useRef} from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { PiStackBold } from "react-icons/pi";
import './Styles/AccountNavBar.Module.css';

export const NavBar = ({ collapsed }) => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setOverlayVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    return (
        <div className= "nav-container">        
            <div ref={navbarRef} className={`nav-bar ${collapsed ? 'collapsed' : ''} ${overlayVisible ? 'overlay visible' : 'overlay'}`}>            <ul className="nav-menu">
                <li><img className='account-bb-logo' src="BudgetBuddyLogo.png" alt='budget buddy logo' /></li>
                <hr className='sepeartor' />
                <li className='menu-item'><a href="#" className='menu-link' id='active-page'><LuLayoutDashboard className='link-icon'/> Dashboard</a></li>
                <li className='menu-item'><a href="#" className='menu-link'><AiOutlineTransaction className='link-icon'/> Transactions</a></li>
                <hr className='sepeartor' />
            </ul>
        </div>
        <div className="collapsed-icon" onClick={toggleOverlay}>
                <PiStackBold className='collapsed-link-icon' />
        </div>
    </div>
    );
}

export default NavBar;
