import React, { useState } from "react";
import styles from "@/styles/TransactionComponent.module.css";
import { GoLinkExternal } from "react-icons/go";

export default function TransactionComponent() {
  const [mode, setMode] = useState("mint");
  const [mintAmount, setMintAmount] = useState(0);

  const handleChange = (e) => {
    if (e.target.value < 0) return;
    if (e.target.value > 150) return;
    setMintAmount(e.target.value);
  };

  const handleDecrement = () => {
    if (mintAmount == 0) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount + 1 > 150) return;
    setMintAmount(mintAmount + 1);
  };

  const handleMint = (e) => {
    e.preventDefault();
  };

  // TODO Integrate
  let ether = (mintAmount * 0.2).toFixed(2);

  if (mode === "transfer") return <TransferForm setMode={setMode} />;

  return (
    <form onSubmit={handleMint} className={styles.container}>
      <div className={styles.header}>
        <span className={styles.selected}>Mint</span>
        <span onClick={() => setMode("transfer")}>Transfer</span>
        {/* // TODO add Goerli faucet link */}
        <a href="#" id={styles.faucet}>
          Goerli Faucet <GoLinkExternal />
        </a>
      </div>
      <div className={styles.mint}>
        <p>1 HKP Token = 0.2 Goerli Ether</p>
        <div className={styles.input}>
          <button onClick={handleDecrement} type="button">
            -
          </button>
          <input
            type="number"
            placeholder="Number of tokens"
            value={mintAmount}
            onChange={handleChange}
          />
          <button onClick={handleIncrement} type="button">
            +
          </button>
        </div>
        <p>{ether} Goerli Ether</p>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Mint HKP
      </button>
    </form>
  );
}

function TransferForm({ setMode }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState();

  const handleChange = (e) => {
    if (e.target.value < 0) return;
    setAmount(e.target.value);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleTransfer} className={styles.container}>
      <div className={styles.header}>
        <span onClick={() => setMode("mint")}>Mint</span>
        <span className={styles.selected}>Transfer</span>
        <a href="#" id={styles.faucet}>
          Goerli Faucet
          {/* // TODO add Goerli faucet link */}
          <GoLinkExternal />
        </a>
      </div>
      <div className={styles.transfer}>
        {/* // TODO Integrate */}
        <p>From 0x8956....CA92</p>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          type="text"
          placeholder="To"
        />
        <input
          value={amount}
          onChange={handleChange}
          min="0"
          type="number"
          placeholder="Number of tokens"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Transfer HKP
      </button>
    </form>
  );
}
