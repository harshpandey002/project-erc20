import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const initialState = {
  wallet: {},
};

export const walletContext = createContext(initialState);
export const useWalletContext = () => useContext(walletContext);

function WalletProvider({ children }) {
  useEffect(() => {}, []);

  const contextValue = {};

  return (
    <walletContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </walletContext.Provider>
  );
}

export default WalletProvider;
