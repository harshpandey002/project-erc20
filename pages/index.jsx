import MintInfo from "@/components/MintInfo";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <MintInfo />
    </div>
  );
}
