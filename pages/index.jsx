import BurnToken from "@/components/BurnToken";
import Minters from "@/components/Minters";
import MintInfo from "@/components/MintInfo";
import Navbar from "@/components/Navbar";
import Transactions from "@/components/Transactions";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      <MintInfo />
      <Minters />
      <BurnToken />
      <Transactions />
    </div>
  );
}
