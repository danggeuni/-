import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import cx from "clsx";

export default function Footer() {
  const [data, setData] = useState({ content: "", author: "" });
  const [toggleOn, setToggleon] = useState(false);

  // input의 값 state 만들고, form으로 submit시 local에 넘어가야함.
  // form의 submit의 state는 배열로 진행하고, setState([newData,...state]) 형식으로 가야함
  // local에 data가 존재할 경우, 기존 p태그를 숨기고 ul > map을 통해 li화 시켜야함.
  // 리스트는 별도의 컴포넌트로 만들어 수정버튼과 삭제버튼을 위치 시켜야함.

  const [todoText, setTodoText] = useState([]);

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

  // 이벤트를 막고 input value를 로컬로 보내자.
  function todoSubmit(e) {
    e.preventDefault();
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

            <form className={styles.continerForm} onSubmit={todoSubmit}>
              <ul className={styles.list}>
                <p className={styles.noList}>Make your List 👇</p>
              </ul>
              <input
                onChange={(e) => setTodoText(e.target.value)}
                value={todoText}
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
