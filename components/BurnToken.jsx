import React, { useState } from "react";
import styles from "@/styles/BurnToken.module.css";
import { useWalletContext } from "context/walletContext";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export default function BurnToken() {
  const [message, setMessage] = useState("");
  const {
    createEthereumContract,
    getEventsAndMinters,
    contractState,
    account,
  } = useWalletContext();

  const handleBurn = async () => {
    setMessage("");

    if (!account) {
      toast.info("You need to install Metamask.");
      return;
    }

    if (!contractState.myBalance) {
      toast.info("You dont have any token to burn.");
      return;
    }

    const contractMethods = createEthereumContract();

    try {
      const txn = await contractMethods.burn(ethers.utils.parseEther("1"));

      const res = await fetch(`http://localhost:3000/api/transaction`, {
        method: "PATCH",
        body: JSON.stringify({
          to: txn.to,
          amount: 1,
          hash: txn.hash,
          from: txn.from,
          method: "Burn",
        }),
      });

      getEventsAndMinters();

      const data = await res.json();
      console.log(data);
      setMessage("data.message");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 id="heading">Secret Message</h2>
      {!message && (
        <div onClick={handleBurn} className={styles.content}>
          <p>
            Click on the area to{" "}
            <span id={styles.action}>Burn 1 HKP Token</span> to see the message
          </p>
        </div>
      )}
      {message && (
        <div className={styles.message}>
          <p>“{message}”</p>
          <button onClick={handleBurn} id={styles.burn}>
            Burn more
          </button>
        </div>
      )}
    </div>
  );
}
