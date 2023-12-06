import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {LandingPage} from './Components/LandingPage/LandingPage'
import {RegestrationPage} from './Components/Regestration Page/RegestrationPage'
import {Dashboard} from './Components/Dashboard/Dashboard'
import {UserContext} from './Components/UserContext'
import Cookies from "js-cookie";

export function BudgetBuddyApp() {
  const [user, setUser] = useState(null);
  const [userWallets, setUserWallets] = useState([]);
  const [walletId, setWalletId] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const storedUserWallets = Cookies.get('userWallets');
    const storedWalletId = Cookies.get('walletId');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUserWallets) {
      setUserWallets(JSON.parse(storedUserWallets));
    }
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set('user', JSON.stringify(user));
    }
    if (userWallets) {
      Cookies.set('userWallets', JSON.stringify(userWallets));
      console.log(userWallets)
    }
    if (walletId) {
      Cookies.set('walletId', walletId);
    }
  }, [user, userWallets, walletId]);

  return(
    <UserContext.Provider value={{ user, walletId, setWalletId, userWallets, setUserWallets }}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/user/dashboard" /> : <LandingPage />} />
          <Route path="/registration-page" element={user ? <Navigate to="/user/dashboard" /> : <RegestrationPage />} />
          <Route path="/user/dashboard" element={!user ? <Navigate to="/" /> : <Dashboard />} />
          <Route path="/user/transactions" element={!user ? <Navigate to="/" /> : <Dashboard />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default BudgetBuddyApp;
