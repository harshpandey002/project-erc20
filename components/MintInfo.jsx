import React from "react";
import styles from "@/styles/MintInfo.module.css";

export default function MintInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.barWrapper}>
        <p className={styles.barInfo} id={styles.infoRight}>
          100 Minted
        </p>
        <div className={styles.bar}>
          <span id={styles.arrowUp} />
          <p id={styles.mintMsg}>50 Left</p>
        </div>
        <p className={styles.barInfo} id={styles.infoLeft}>
          150 Max Supply
        </p>
      </div>
    </div>
  );
}
