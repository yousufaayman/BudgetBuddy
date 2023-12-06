import React, { useState, useEffect, useRef } from 'react';
import './Styles/AccountTopBar.css'
import { FaUserCircle } from "react-icons/fa";
import UserContext from '../UserContext';

export const TopBar = ({pageName}) => {
  const [isUserOptionsOpen, setUserOptionsIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setUserOptionsIsOpen(false);
    }
  };  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-bar-container">
      <h1 className='page-title'>{pageName}</h1>
      <div className='account-dropdown'>
        <FaUserCircle onClick={() => setUserOptionsIsOpen(!isUserOptionsOpen)} className='account-icon'/>
        {isUserOptionsOpen && (
          <div ref={dropdownRef} className='account-dropdown-menu'>
            <a className='user-account-options' href='/profile'>Edit Profile</a>
            <a className='user-account-options' href='/settings'>Settings</a>
            <a className='user-account-options' href='/logout'>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
