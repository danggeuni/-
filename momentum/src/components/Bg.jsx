import { useState } from "react";

export default function Bg() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

  const Access_Key = "Y4tCQTL567iRyvBp2qbupg1qtYcpX7xAqdbcBf1bxR5UY";
  const url = `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}&orientation=landscape&per_page=20`;

  const fetchRequest = async () => {
    const response = await fetch(url);
    const responseJson = await response.json();
    const result = responseJson.results;
    console.log(result);
    setRes(result);
  };
  return <div></div>;
}
