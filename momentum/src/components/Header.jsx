import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.header}>
      <div className={styles.search}>
        <button onClick={() => {}} className={styles.toggle}>
          Search
        </button>
        <div className={styles.inputWrapper}>
          <form className={styles.form}>
            <input
              className={styles.input}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
            <button className={styles.button}></button>
          </form>
        </div>
      </div>
    </div>
  );
}
