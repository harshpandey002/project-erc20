/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Hero.module.css";
import TransactionComponent from "./TransactionComponent";

function Hero() {
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
        {/* <button className="btn-hero">
          <img id="walletIcon" src="metamask-icon.svg" alt="hey" />
          Connect Wallet
        </button> */}
      </div>
      <div className={styles.content}>
        <div className={styles.form}>
          <TransactionComponent />
        </div>
        <div className={styles.cardContainer}>
          <div id={styles.gry5} />
          <div id={styles.gry4} />
          <div id={styles.gry2} />
          <div id={styles.gry3} />
          <div id={styles.gry1} />
          <div className={styles.card}></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
