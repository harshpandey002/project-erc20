import React from "react";
import styles from "@/styles/Transactions.module.css";

export default function Transactions() {
  return (
    <div className={styles.container}>
      <h2 id={styles.heading}>Transaction Logs</h2>
      <div className={styles.content}>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </div>
    </div>
  );
}

function Transaction() {
  return (
    <div className={styles.block}>
      <p className={styles.action}>
        0xDb23....2D5A <span className={styles.method}>Minted</span> 2 HKP
        Tokens from Smart Contract{" "}
        <span className={styles.timestamp}>36 mins ago</span>
      </p>
      <a href="#" className={styles.link}>
        View on Block Explorer
      </a>
    </div>
  );
}
