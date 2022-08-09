import React, { useState } from "react";
import styles from "@/styles/TransactionComponent.module.css";

export default function TransactionComponent() {
  const [mode, setMode] = useState("mint");

  if (mode === "transfer") return <TransferForm setMode={setMode} />;

  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <span className={styles.selected}>Mint</span>
        <span onClick={() => setMode("transfer")}>Transfer</span>
      </div>
      <div className={styles.mint}>
        <p>1 HKP Token = 0.2 Ether (2 * 10e18 wei)</p>
        <div className={styles.input}>
          <button type="button">-</button>
          <input type="number" placeholder="Number of tokens" />
          <button type="button">+</button>
        </div>
        <p>0 Ether</p>
      </div>
      <button type="submit" className={styles.submitBtn}>
        Mint HKP
      </button>
    </form>
  );
}

function TransferForm({ setMode }) {
  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <span onClick={() => setMode("mint")}>Mint</span>
        <span className={styles.selected}>Transfer</span>
      </div>
      <div className={styles.transfer}>
        <p>From 0x8956....CA92</p>
        <input type="text" placeholder="To" />
        <input type="number" placeholder="Number of tokens" />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Transfer HKP
      </button>
    </form>
  );
}
