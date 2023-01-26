import cx from "clsx";

import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);

  function activeToggle() {
    setActive(!active);
  }

  return (
    <div className={styles.header}>
      <div className={styles.search}>
        {/* Search 버튼 클릭 시 input 창이 나타나게 만든다. */}
        <button onClick={() => activeToggle()} className={styles.toggle}>
          Search
        </button>
        <div className={styles.inputWrapper}>
          <form className={styles.form}>
            <input
              className={cx(styles.input, { [styles.active]: active })}
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
