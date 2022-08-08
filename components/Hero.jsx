import React from "react";
import styles from "@/styles/Hero.module.css";

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
        <button className="btn-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="metamask-icon.svg" alt="hey" />
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default Hero;
