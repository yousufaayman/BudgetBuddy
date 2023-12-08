import React, { useState, useEffect, useRef, useContext } from "react";
import "./Styles/AccountTopBar.css";
import { FaUserCircle } from "react-icons/fa";
import UserContext from "../../Services/UserContext";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export const TopBar = ({ pageName }) => {
  const [isUserOptionsOpen, setUserOptionsIsOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { setUser, setUserWallets, setWalletId } = useContext(UserContext);

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    setUserWallets([]);
    setWalletId(null);
    navigate("/");
  };

  const handleClickOutside = (e) => {
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
      <h1 className="page-title">{pageName}</h1>
      <div className="account-dropdown">
        <FaUserCircle
          onClick={() => setUserOptionsIsOpen(!isUserOptionsOpen)}
          className="account-icon"
        />
        {isUserOptionsOpen && (
          <div ref={dropdownRef} className="account-dropdown-menu">
            <a className="user-account-options">Edit Profile</a>
            <a className="user-account-options">Settings</a>
            <a className="user-account-options" onClick={logout}>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
