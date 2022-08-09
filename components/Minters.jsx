/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/Minters.module.css";

export default function Minters() {
  return (
    <div className={styles.container}>
      <h2 id="heading">All Minters</h2>
      <div className={styles.content}>
        <div id={styles.gry5} />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className={styles.cardContainer}>
      <div id={styles.gry4} />
      <div id={styles.gry2} />
      <div id={styles.gry3} />
      <div id={styles.gry1} />
      <div className={styles.card}>
        <div className={styles.cardLeft}>
          <h3>Ethereum</h3>
          <h2>20 HKP</h2>
          <p>0x8956....CA92</p>
        </div>
        <div className={styles.cardRight}>
          <img src="ethereum-icon.svg" alt="ethereum" />
        </div>
      </div>
    </div>
  );
}
