import styles from "./Background.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Background() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setImages(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "https://api.unsplash.com/search/photos/?query=nature&color=black&orientation=landscape&client_id=4tCQTL567iRyvBp2qbupg1qtYcpX7xAqdbcBf1bxR5U"
        );
        const index = Math.floor(Math.random() * response.data.results.length);
        console.log(response.data.results.length);
        setImages(response.data.results[index].urls.regular); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  console.log(images);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!images) return null;

  return <img className={styles.backgroundImg} src={images} alt={"사진"} />;
}
