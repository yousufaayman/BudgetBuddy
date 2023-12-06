import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

 const WalletsDropwdoown = ({ className, onCategoryChange }) => {
  const { user } = useContext(UserContext);
  const [userWallets, settUserWallets] = useState([]);
  const [selectedUserWallet, setSelectedUserWallet] = useState('');
  console.log(user)

  useEffect(() => {
    const fetchuserWallets = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/wallets/${user}`);
        settUserWallets(response.data.wallets);
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };

    fetchuserWallets();
  }, [user]);

  const handleExpenseCategorryChange = (e) => {
    const SelectedUserWallet = e.target.value;
    setSelectedUserWallet(SelectedUserWallet);
    onCategoryChange(SelectedUserWallet);
  };

  return (
      <select className={className} value={selectedUserWallet} onChange={handleExpenseCategorryChange}>
        <option value="">Select a Wallet</option>
        {userWallets.map((wallet, index) => (
          <option key={index} value={wallet.id}>
            {wallet.walletName}
          </option>
        ))}
      </select>
  );
};

export {WalletsDropwdoown};
