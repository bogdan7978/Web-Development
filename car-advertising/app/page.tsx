import Image from "next/image";
import styles from "./page.module.css";
import TitleWithDropdown from "@/components/dropdown";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.hero_title}>
          <h1 className={styles.hero_main_title}>Car Advertising</h1>
          <p className={styles.hero_subtitle}>Increase your exposure</p>
        </div>
        <div className={styles.hero_image}>
          <Image src="/benz.png" alt="car-image" height={600} width={600}  />
        </div>
      </div>


      <h2 className={styles.catch_phrase}>
        AFFORDABLE, NON-INTRUSIVE, EYE-CATCHING
      </h2>

      <div className={styles.list}>
        <h2>Why car advertising is a powerful marketing strategy</h2>
        <ol className={styles.list_items}>
          <li>Broad exposure</li>
          <li>Cost-effective</li>
          <li>Targets the local market</li>
          <li>Attention-grabbing</li>
          <li>Non-intrusive</li>
          <li>24/7 advertising</li>
        </ol>
      </div>

      <div className={styles.dropdown}>
        <TitleWithDropdown />
      </div>

    </div>
  );
}
