import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./DogDetails.module.css";
import { Link } from "react-router-dom";
const DogDetails = () => {
  const [details, setdetails] = useState([]);

  var url = useParams();
  useEffect(() => {
    async function callApi() {
      const res = await axios.get(`http://localhost:3001/dogs/${url.id}`);
      setdetails(res.data);
      console.log(res.data);
    }
    callApi();
  }, [url]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {details.map((e) => (
          <div className={styles.rela}>
            <img className={styles.image} src={e.image.url}></img>
            <h1>{e.name}</h1>
            <p>{e.temperament}</p>
            <p>{e.life_span}</p>
            <p>Peso: {e.weight.metric}</p>
            <p>Altura: {e.height.metric}</p>
          </div>
        ))}
      </div>
      <Link to="/dogs">Volver</Link>
    </div>
  );
};

export default DogDetails;
