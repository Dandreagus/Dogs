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
    }
    callApi();
  }, [url]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {url.id.length < 4
          ? details.map((e) => (
              <div key={e.name} className={styles.rela}>
                <h1>{e.name}</h1>
                <p>{e.temperament}</p>
                <p>{e.life_span}</p>
                <p>Peso: {e.weight}</p>
                <p>Altura: {e.height}</p>
              </div>
            ))
          : details.map((e) => (
              <div key={e.name} className={styles.rela}>
                <h1>{e.name}</h1>
                <p>Años de vida: {e.añosDeVida}</p>
                <p>Peso minimo: {e.weight_minimo}</p>
                <p>Peso maximo: {e.weight_maximo}</p>
                <p>Altura minima: {e.height_minimo}</p>
                <p>Altura maxima: {e.height_maximo}</p>
              </div>
            ))}
      </div>
      <Link to="/dogs">Volver</Link>
    </div>
  );
};

export default DogDetails;
// <img className={styles.image} src={e.image.url}></img>
