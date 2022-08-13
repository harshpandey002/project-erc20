/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Hero.module.css";
import TransactionComponent from "./TransactionComponent";
import { useWalletContext } from "context/walletContext";
import { formatAddress } from "@/helpers/constants";
import Copy from "./Copy";

function Hero() {
  const { isWalletConnected, account, connectWallet, contractState } =
    useWalletContext();

  return (
    <div className={styles.container}>
      <div className={styles.blueBlob} />
      <div className={styles.redBlob} />
      <div className={styles.heading}>
        <span>
          <h1>Ethereum Request for</h1>
          <span id={styles.gradient}>
            <h1>Comments20</h1>
            <h1>HKP Token</h1>
          </span>
        </span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum impedit
          mollitia possimus voluptatibus consectetur dolore, et sit veritatis
          corrupti eaque laudantium, delectus aliquam?
        </p>
        {!isWalletConnected && (
          <button onClick={connectWallet} className="btn-hero">
            <img id="walletIcon" src="metamask-icon.svg" alt="hey" />
            Connect Wallet
          </button>
        )}
      </div>
      <div className={styles.content}>
        {isWalletConnected && (
          <div className={styles.form}>
            <TransactionComponent />
          </div>
        )}
        <div className={styles.cardContainer}>
          <div id={styles.gry5} />
          <div id={styles.gry4} />
          <div id={styles.gry2} />
          <div id={styles.gry3} />
          <div id={styles.gry1} />
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <h3>Ethereum</h3>
              <h2>{isWalletConnected ? contractState.myBalance : 0} HKP</h2>
              <p className="address">
                {isWalletConnected
                  ? formatAddress(account)
                  : "Connect you wallet"}
                <Copy address={account} />
              </p>
            </div>
            <div className={styles.cardRight}>
              <img src="ethereum-icon.svg" alt="ethereum" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
