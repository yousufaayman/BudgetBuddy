import React, { useState, useEffect, useRef } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { PiStackBold } from "react-icons/pi";
import "./Styles/AccountNavBar.Module.css";
import { WalletPopup } from "./WalletPopup";
import { useNavigate } from "react-router";

export const NavBar = ({ collapsed, activePage }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isWalletPopupOpen, setisWalletPopupOpen] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOverlayVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleOpenWalletPopup = () => {
    setisWalletPopupOpen(true);
  };

  const handleCloseWalletPopup = () => {
    setisWalletPopupOpen(false);
  };

  return (
    <div className="nav-container">
      <div
        ref={navbarRef}
        className={`nav-bar ${collapsed ? "collapsed" : ""} ${
          overlayVisible ? "overlay visible" : "overlay"
        }`}
      >
        <div className="nav-menu">
          <div className="select-wallet">
            <button
              className="select-wallet-button"
              onClick={handleOpenWalletPopup}
            >
              Wallet popup
            </button>
            {isWalletPopupOpen && (
            <WalletPopup
              isOpen={isWalletPopupOpen}
              onClose={handleCloseWalletPopup}
            />
          )}
          </div>
            <img
              className="account-bb-logo"
              src="BudgetBuddyLogo.png"
              alt="budget buddy logo"
            />
          <div className="nav-links">
          <hr />
          <li className="menu-item">
            <a
              onClick={() => navigate("/user/dashboard")}
              className={`menu-link ${
                activePage === "dashboard" ? "active-page" : ""
              }`}
            >
              <LuLayoutDashboard className="link-icon" /> Dashboard
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => navigate("/user/transactions")}
              className={`menu-link ${
                activePage === "transactions" ? "active-page" : ""
              }`}
            >
              <AiOutlineTransaction className="link-icon" /> Transactions
            </a>
          </li>
          <hr />
          </div>
        </div>
      </div>

      <div className="collapsed-icon" onClick={toggleOverlay}>
        <PiStackBold className="collapsed-link-icon" />
      </div>
    </div>
  );
};

export default NavBar;
