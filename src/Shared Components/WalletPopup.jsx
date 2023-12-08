import React, { useContext } from "react";
import "./Styles/popups.css";
import { GrClose } from "react-icons/gr";
import UserContext from "../../Services/UserContext";
import { WalletsDropwdoown } from "./UserWalletsDropdown";

export const WalletPopup = ({ isOpen, onClose }) => {
  const { setWalletId } = useContext(UserContext);

  const handleSelectedWallet = (selectedWallet) => {
    setWalletId(selectedWallet);
  };

  return (
    <>
      {isOpen && (
        <div className="wallet-popup">
          <button id="walletclose-btn" onClick={onClose}>
            <GrClose style={{ color: "#7b0dcf" }} />
          </button>

          <WalletsDropwdoown onWalletSelectChange={handleSelectedWallet} />
        </div>
      )}
    </>
  );
};

export default WalletPopup;
