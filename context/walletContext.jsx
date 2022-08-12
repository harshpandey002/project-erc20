import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/helpers/constants";
import TxnModal from "@/components/TxnModal";

export const walletContext = createContext();
export const useWalletContext = () => useContext(walletContext);

// ! createEthereumContract()
const createEthereumContract = () => {
  let contractMethods = null;
  let provider = null;

  const { ethereum } = window;

  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    contractMethods = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    provider = new ethers.providers.EtherscanProvider(
      "goerli",
      "2TBC8DFX2KC651Q7XYNIS2GWKA4SX9YPFX"
    );
    contractMethods = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
  }

  return contractMethods;
};

function WalletProvider({ children }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [contractState, setContractState] = useState({});
  const [events, setEvents] = useState([]);
  const [minters, setMinters] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    method: "",
    loading: true,
    txn: "",
  });

  // ! checkConnection()
  const getProvider = async () => {
    const { ethereum } = window;
    let provider = new ethers.providers.Web3Provider(ethereum);
    return provider;
  };

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
    window.ethereum.on("accountsChanged", function () {
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
    getProvider,
    events,
    minters,
    modal,
    setModal,
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
      <TxnModal modal={modal} setModal={setModal} />
    </walletContext.Provider>
  );
}

export default WalletProvider;
