import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styles from "./Footer.module.css";
import cx from "clsx";
import { stateContext } from "../App";
import { dispatchContext } from "../App";

export default function Footer() {
  const [text, setData] = useState({ content: "", author: "" });
  const [hidden, setHidden] = useState(false);
  const [toggleOn, setToggleon] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [ischecked, setIschecked] = useState(false);

  const { onCreate, onDelete, onChecked } = useContext(dispatchContext);

  const list = useContext(stateContext);

  useEffect(() => {
    setHidden(true);

    if (list.length === 0) {
      setHidden(false);
      console.log(list.length);
    }
  }, [list]);

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(
        "https://api.quotable.io/random?maxLength=60"
      );
      setData({ content: response.data.content, author: response.data.author });
    }
    fetch();
  }, []);

  // input의 값 state 만들고, form으로 submit시 local에 넘어가야함.
  // form의 submit의 state는 배열로 진행하고, setState([newData,...state]) 형식으로 가야함
  // local에 data가 존재할 경우, 기존 p태그를 숨기고 ul > map을 통해 li화 시켜야함.
  // 리스트는 별도의 컴포넌트로 만들어 수정버튼과 삭제버튼을 위치 시켜야함.

  function todoClick() {
    setToggleon(!toggleOn);
  }

  // 이벤트를 막고 input value를 로컬로 보내자.
  function handleSubmit(e) {
    e.preventDefault();

    onCreate(todoText);
    setTodoText("");

    setHidden(true);
  }

  // 삭제 함수 실행 함수
  function onRemove(i) {
    onDelete(i);
  }

  // 체크될 경우 style 지정
  function onClick(i) {
    console.log(i.id);
    onChecked(i.id);
  }

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.description}></div>

        <div className={styles.quote}>
          <p className={styles.content}>{text.content}</p>
          <cite className={styles.author}>{text.author}</cite>
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
            <form className={styles.continerForm} onSubmit={handleSubmit}>
              <ul className={styles.list}>
                <p className={cx(styles.noList, { [styles.hide]: hidden })}>
                  Make your List 👇
                </p>

                {list.map((i) => (
                  <li className={styles.listContainer} key={i.id}>
                    <label>
                      <input
                        type={"checkbox"}
                        onChange={() => onClick(i)}
                        checked={i.isCheck}
                      ></input>
                      <span
                        className={cx(styles.span, {
                          [styles.midLine]: ischecked,
                        })}
                      >
                        {i.content}
                      </span>
                    </label>

                    <button
                      type={"button"}
                      className={styles.delButton}
                      onClick={() => onRemove(i.id)}
                    ></button>
                  </li>
                ))}
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
