import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/helpers/constants";
import TxnModal from "@/components/TxnModal";

export const walletContext = createContext();
export const useWalletContext = () => useContext(walletContext);

function WalletProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
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

    try {
      const { ethereum } = window;

      if (ethereum && currentAccount) {
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
          process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
        );
        contractMethods = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );
      }

      return contractMethods;
    } catch (error) {
      console.log(error);
    }
  };

  // ! getProvider()
  const getProvider = async () => {
    const { ethereum } = window;
    let provider = new ethers.providers.Web3Provider(ethereum);
    return provider;
  };

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${Number(5).toString(16)}`,
            chainName: "Görli",
            nativeCurrency: {
              name: "Görli Ether",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [
              "https://goerli.infura.io/v3/${INFURA_API_KEY}",
              "wss://goerli.infura.io/v3/${INFURA_API_KEY}",
              "https://rpc.goerli.mudit.blog/",
            ],
            blockExplorerUrls: ["https://goerli.etherscan.io"],
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkConnection = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      setCurrentAccount(accounts[0]);

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(5).toString(16)}` }],
        });
      } catch (error) {
        console.log(error);

        if (error.code === 4902) {
          addNetwork();
        }

        if (error.code === -32002) {
          toast.info("Open Metamask");
        }
      }

      getContractStates();
    } catch (error) {
      console.log(error);
    }
  };

  // ! connectWallet()
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      getContractStates();
    } catch (error) {
      console.log(error);
    }
  };

  // ! getContractStates()
  const getContractStates = async () => {
    try {
      const contractMethods = createEthereumContract();

      const state = await contractMethods.returnState();

      setContractState({
        myBalance: state[0]
          ? parseFloat(ethers.utils.formatEther(state[0]))
          : 0,
        maxSupply: parseFloat(ethers.utils.formatEther(state[1])),
        totalSupply: parseFloat(ethers.utils.formatEther(state[2])),
        tokenPrice: ethers.utils.formatEther(state[3]),
      });
    } catch (error) {
      console.log(error);
      if (error.code === "UNSUPPORTED_OPERATION") {
        location.reload();
      }
    }
  };

  const getEventsAndMinters = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/transaction`);
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

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleDisconnect);
    // Cleanup of listener on unmount
    return () => {
      ethereum.removeListener("chainChanged", handleChainChanged);
      ethereum.removeListener("accountsChanged", handleDisconnect);
    };
  }, []);

  const handleDisconnect = (accounts) => {
    if (accounts.length == 0) {
      setCurrentAccount("");
    } else {
      setCurrentAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainId) => {
    if (chainId == "0x5") return; // chain id is received in hexadecimal
    window.location.reload();
  };

  const contextValue = {
    currentAccount,
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
