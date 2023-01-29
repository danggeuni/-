import cx from "clsx";

import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  function activeToggle() {
    setActive(!active);
  }

  function onSubmit(e) {
    e.preventDefault();
    window.open("https://www.google.co.kr/search?q=" + search);
    setSearch("");
  }

  return (
    <div className={styles.header}>
      <div className={styles.search}>
        {/* Search 버튼 클릭 시 input 창이 나타나게 만든다. */}
        <button onClick={() => activeToggle()} className={styles.toggle}>
          Search
        </button>
        <div className={styles.inputWrapper}>
          <form onSubmit={onSubmit} className={styles.form}>
            <input
              className={cx(styles.input, { [styles.active]: active })}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            ></input>
            <button
              className={cx(styles.button, { [styles.active]: active })}
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
}
