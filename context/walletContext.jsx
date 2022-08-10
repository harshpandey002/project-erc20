import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/helpers/constants";

export const walletContext = createContext();
export const useWalletContext = () => useContext(walletContext);

// ! createEthereumContract()
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

function WalletProvider({ children }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [contractState, setContractState] = useState({});

  // ! checkConnection()
  const checkConnection = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts.length) return;

    setIsWalletConnected(true);
    setAccount(accounts[0]);
  };

  // ! connectWallet()
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

  // ! getContractStates()
  const getContractStates = async () => {
    const contractMethods = createEthereumContract();

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const state = await Promise.all([
      contractMethods.owner(),
      contractMethods.totalSupply(),
      contractMethods.maxSupply(),
      contractMethods.tokenPrice(),
      contractMethods.balanceOf(accounts[0]),
    ]);

    setContractState({
      owner: state[0],
      totalSupply: parseFloat(ethers.utils.formatEther(state[1])),
      maxSupply: parseFloat(ethers.utils.formatEther(state[2])),
      tokenPrice: ethers.utils.formatEther(state[3]),
      myBalance: parseFloat(ethers.utils.formatEther(state[4])),
    });
  };

  // ! useEffect()
  useEffect(() => {
    checkConnection();
    const { ethereum } = window;
    if (!ethereum) return;
    getContractStates();
  }, []);

  const contextValue = {
    isWalletConnected,
    account,
    connectWallet,
    createEthereumContract,
    contractState,
  };

  console.log(contractState);

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
