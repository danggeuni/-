import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import cx from "clsx";

export default function Footer() {
  const [data, setData] = useState({ content: "", author: "" });
  const [toggleOn, setToggleon] = useState(false);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(
        "https://api.quotable.io/random?maxLength=60"
      );
      setData({ content: response.data.content, author: response.data.author });
    }
    fetch();
  }, []);

  function todoClick() {
    setToggleon(!toggleOn);
  }

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.description}></div>

        <div className={styles.quote}>
          <p className={styles.content}>{data.content}</p>
          <cite className={styles.author}>{data.author}</cite>
        </div>

        <button onClick={todoClick} className={styles.toggle}>
          Todo
        </button>
        <div
          className={cx(styles.todoPosition, {
            [styles.todoWrapper]: toggleOn,
          })}
        >
          <div className={styles.todoWrapper}>
            <header className={styles.todoHeader}>
              <h2 className={styles.todoTitle}>ToDoList</h2>
            </header>

            <form className={styles.continerForm}>
              <ul className={styles.list}>
                <p className={styles.noList}>Make your List 👇</p>
              </ul>
              <input
                className={styles.listInput}
                placeholder={"Wirte Your List"}
                required
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

<input
  class="container-bottom--container__container--input"
  type="text"
  placeholder="Write Your List"
  required
/>;
