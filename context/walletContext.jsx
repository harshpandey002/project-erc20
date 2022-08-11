import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/helpers/constants";

export const walletContext = createContext();
export const useWalletContext = () => useContext(walletContext);

// ! createEthereumContract()
const createEthereumContract = () => {
  let transactionsContract = null;
  let provider = null;

  const { ethereum } = window;

  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
  } else {
    provider = new ethers.providers.EtherscanProvider(
      "goerli",
      "2TBC8DFX2KC651Q7XYNIS2GWKA4SX9YPFX"
    );
    transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
  }

  return transactionsContract;
};

function WalletProvider({ children }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [contractState, setContractState] = useState({});
  const [events, setEvents] = useState([]);
  const [minters, setMinters] = useState([]);

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

    const { ethereum } = window;

    const accounts = await ethereum?.request({
      method: "eth_requestAccounts",
    });

    let state = null;

    if (ethereum) {
      state = await Promise.all([
        contractMethods.totalSupply(),
        contractMethods.maxSupply(),
        contractMethods.tokenPrice(),
        contractMethods.balanceOf(accounts[0]),
      ]);
    } else {
      state = await Promise.all([
        contractMethods.totalSupply(),
        contractMethods.maxSupply(),
        contractMethods.tokenPrice(),
      ]);
    }

    setContractState({
      totalSupply: parseFloat(ethers.utils.formatEther(state[0])),
      maxSupply: parseFloat(ethers.utils.formatEther(state[1])),
      tokenPrice: ethers.utils.formatEther(state[2]),
      myBalance: ethereum ? parseFloat(ethers.utils.formatEther(state[3])) : 0,
    });
  };

  const getEventsAndMinters = async () => {
    const res = await fetch("http://localhost:3000/api/transaction");
    const data = await res.json();

    setEvents(data.events);
    setMinters(data.minters);
  };

  // ! useEffect()
  useEffect(() => {
    checkConnection();
    getContractStates();
    getEventsAndMinters();

    const { ethereum } = window;
    if (!ethereum) return;
    window.ethereum.on("accountsChanged", function (accounts) {
      checkConnection();
      getContractStates();
    });
  }, []);

  const contextValue = {
    isWalletConnected,
    account,
    connectWallet,
    createEthereumContract,
    getContractStates,
    contractState,
    getEventsAndMinters,
    events,
    minters,
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
