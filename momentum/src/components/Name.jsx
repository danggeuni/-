import { useEffect, useState } from "react";
import styles from "./Name.module.css";
import cx from "clsx";

export default function Name() {
  const [name, setName] = useState("");
  const [hide, setHide] = useState(false);
  const NAME = "greeting";

  // 시작 시 로컬스토리지에 data가 null일 경우, 입력란이 보여야 한다.
  // 반대로 로컬스토리지에 data가 있을 경우 입력란이 보이면 안된다.
  useEffect(() => {
    const loadedName = localStorage.getItem(NAME);
    if (loadedName === null) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, [hide]);

  // submit시 hide를 true로 바꾸고, initText를 숨기고, logText를 보이게 만들어야 한다.
  function onSubmit(e) {
    e.preventDefault();
    localStorage.setItem(NAME, name);
    setHide(true);
  }

  return (
    <div className={styles.nameContainer}>
      <div className={styles.greetingContainer}>
        <span className={cx(styles.initText, { [styles.hide]: hide })}>
          Thank you visiting my website !
        </span>
        <span className={cx(styles.logText, { [styles.hide]: !hide })}>
          Have A Nice Day!
        </span>
      </div>

      <form className={styles.containerWrapper} onSubmit={onSubmit}>
        <input
          className={cx(styles.name, { [styles.hide]: hide })}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={"What's your name?"}
          required
        ></input>

        <button
          className={cx(styles.button, { [styles.hide]: !hide })}
          type={"button"}
          datatype={"edit"}
        ></button>

        <span className={cx(styles.logName, { [styles.hide]: !hide })}>
          {localStorage.getItem(NAME)}
        </span>
      </form>
    </div>
  );
}
