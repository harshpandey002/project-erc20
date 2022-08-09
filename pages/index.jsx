import Minters from "@/components/Minters";
import MintInfo from "@/components/MintInfo";
import Transactions from "@/components/Transactions";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <MintInfo />
      <Minters />
      <Transactions />
    </div>
  );
}
