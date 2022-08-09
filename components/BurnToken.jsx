import React from "react";
import styles from "@/styles/BurnToken.module.css";

export default function BurnToken() {
  return (
    <div className={styles.container}>
      <h2 id="heading">Secret Message</h2>
      <div className={styles.content}>
        <p>
          Click on the area to <span id={styles.action}>Burn 1 HKP Token</span>{" "}
          to see the message
        </p>
      </div>
    </div>
  );
}
