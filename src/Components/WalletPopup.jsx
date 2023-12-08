import React, { useState, useContext } from "react";
import "./Styles/popups.css";
import { GrClose } from "react-icons/gr";
import UserContext from "./UserContext";
import { WalletsDropwdoown } from "./UserWalletsDropdown";

export const WalletPopup = ({ isOpen, onClose, onChangeWallet }) => {
  const { setWalletId } = useContext(UserContext);
  const [selectedWallet, setselectedWallet] = useState("");

  const handleSelectedWallet = (selectedWallet) => {
    setselectedWallet(selectedWallet);
    setWalletId(selectedWallet);
  };

  return (
    <>
      {isOpen && (
        <div className="wallet-popup">
          <button
            id="walletclose-btn"
            onClick={onClose}
            data-test-id="close-wallet-button"
          >
            <GrClose style={{ color: "#7b0dcf" }} />
          </button>

          <WalletsDropwdoown onCategoryChange={handleSelectedWallet} />

          <button
            id="walletclose-btn"
            onClick={onChangeWallet}
            data-test-id="change-wallet-button"
          >
            Change Wallet
          </button>
        </div>
      )}
    </>
  );
};

export default WalletPopup;
