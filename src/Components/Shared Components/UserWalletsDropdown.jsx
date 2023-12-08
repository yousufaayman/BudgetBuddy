import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../Services/UserContext";

const WalletsDropwdoown = ({ className, onWalletSelectChange, dataTestId }) => {
  const { user, walletId } = useContext(UserContext);
  const [userWallets, settUserWallets] = useState([]);

  useEffect(() => {
    const fetchuserWallets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/user/wallets/${user}`,
        );
        settUserWallets(response.data.wallets);
      } catch (error) {
        console.error("Error fetching wallets:", error);
      }
    };

    fetchuserWallets();
  }, [user]);

  const handelSelectedWalletChange = (e) => {
    const SelectedUserWallet = e.target.value;
    onWalletSelectChange(SelectedUserWallet);
  };

  return (
    <select
      className={className}
      value={walletId}
      onChange={handelSelectedWalletChange}
      data-test-id={dataTestId}
    >
      <option value="">Select a Wallet</option>
      {userWallets.map((wallet, index) => (
        <option key={index} value={wallet.id}>
          {wallet.walletName}
        </option>
      ))}
    </select>
  );
};

export { WalletsDropwdoown };
