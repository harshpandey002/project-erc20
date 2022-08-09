import React from "react";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>Project-ERC20</h1>
      </div>
      <ul className={styles.links}>
        <li>LinkedIn</li>
        <li>Github</li>
        <li>Figma</li>
        <li>Portfolio</li>
      </ul>
    </div>
  );
}
