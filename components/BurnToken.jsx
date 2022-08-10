import React, { useState } from "react";
import styles from "@/styles/BurnToken.module.css";

export default function BurnToken() {
  const [message, setMessage] = useState("");

  const handleBurn = async () => {
    setMessage("");

    const res = await fetch("http://localhost:3000/api/secret");
    const data = await res.json();

    setMessage(data.message);
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
