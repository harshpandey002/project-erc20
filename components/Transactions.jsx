import React, { useEffect } from "react";
import styles from "@/styles/Transactions.module.css";
import { GoLinkExternal } from "react-icons/go";
import { ethers } from "ethers";
import { useWalletContext } from "context/walletContext";
import {
  contractAddress,
  eventColor,
  formatAddress,
} from "@/helpers/constants";
import moment from "moment";

export default function Transactions() {
  const { events } = useWalletContext();

  return (
    <div className={styles.container}>
      <h2 id="heading">Transaction Logs</h2>
      <div className={styles.content}>
        {events.map((event) => (
          <Transaction key={event._id} event={event} />
        ))}
      </div>
      <a
        href={`https://goerli.etherscan.io/address/${contractAddress}`}
        target="_blank"
        rel="noreferrer"
        className={styles.contract}
      >
        View Smart Contract on Etherscan
        <GoLinkExternal />
      </a>
    </div>
  );
}

function Transaction({ event }) {
  return (
    <div className={styles.block}>
      <p className={styles.action}>
        {formatAddress(event.from)}{" "}
        <span
          style={{ color: eventColor[event.method] }}
          className={styles.method}
        >
          {event.method}ed
        </span>{" "}
        2 HKP Tokens from Smart Contract{" "}
        <span className={styles.timestamp}>
          {moment(event.createdAt).startOf("minute").fromNow()}
        </span>
      </p>
      <a href="#" className={styles.link}>
        View on Block Explorer
        <GoLinkExternal />
      </a>
    </div>
  );
}
