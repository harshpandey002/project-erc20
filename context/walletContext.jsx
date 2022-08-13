import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/helpers/constants";
import TxnModal from "@/components/TxnModal";

export const walletContext = createContext();
export const useWalletContext = () => useContext(walletContext);

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

  // ! createEthereumContract()
  const createEthereumContract = () => {
    let contractMethods = null;
    let provider = null;

    const { ethereum } = window;

    const acc = localStorage.getItem("account");

    if (ethereum && acc) {
      provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      contractMethods = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
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

  // ! getProvider()
  const getProvider = async () => {
    const { ethereum } = window;
    let provider = new ethers.providers.Web3Provider(ethereum);
    return provider;
  };

  // ! checkConnection()
  const checkConnection = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const acc = localStorage.getItem("account");
    if (!acc) return;

    setIsWalletConnected(true);
    setAccount(acc);
    getContractStates();
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

      if (!accounts.length) {
        setIsWalletConnected(false);
        setAccount(null);
        localStorage.removeItem("account");
      } else {
        setIsWalletConnected(true);
        setAccount(accounts[0]);
        localStorage.setItem("account", accounts[0]);
        getContractStates();
      }
    } catch (error) {
      console.log("Error connecting to metamask", error);
      setIsWalletConnected(false);
      setAccount(null);
      localStorage.removeItem("account");
      console.log(error.code === -32002);
      if (error.code === -32002)
        toast.info("Some error occured, please open metamask manually");
    }
  };

  // ! getContractStates()
  const getContractStates = async () => {
    try {
      const contractMethods = createEthereumContract();

      const { ethereum } = window;

      let state = null;

      const acc = localStorage.getItem("account");

      if (ethereum && acc) {
        state = await Promise.all([
          contractMethods.totalSupply(),
          contractMethods.maxSupply(),
          contractMethods.tokenPrice(),
          contractMethods.balanceOf(ethers.utils.getAddress(acc)),
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
        myBalance: state[3]
          ? parseFloat(ethers.utils.formatEther(state[3]))
          : 0,
      });
    } catch (error) {
      console.log(error);
    }
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
    getEventsAndMinters();

    const { ethereum } = window;
    if (!ethereum) return;
    window.ethereum.on("accountsChanged", function () {
      connectWallet();
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
