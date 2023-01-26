import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [data, setData] = useState({ content: "", author: "" });

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(
        "https://api.quotable.io/random?maxLength=60"
      );
      setData({ content: response.data.content, author: response.data.author });
    }
    fetch();
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.quote}>
        <p className={styles.content}>{data.content}</p>
        <cite className={styles.author}>{data.author}</cite>
      </div>
    </div>
  );
}
