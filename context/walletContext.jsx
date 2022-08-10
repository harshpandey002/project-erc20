import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/helpers/constants";

export const walletContext = createContext();
export const useWalletContext = () => useContext(walletContext);

function WalletProvider({ children }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const checkConnection = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts.length) return;

    setIsWalletConnected(true);
    setAccount(accounts[0]);
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast.info("Please install Metamask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setIsWalletConnected(true);
      setAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const contextValue = {
    isWalletConnected,
    account,
    connectWallet,
  };

  return (
    <walletContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        newestOnTop
        theme="colored"
        pauseOnFocusLoss
        draggable
      />
    </walletContext.Provider>
  );
}

export default WalletProvider;
