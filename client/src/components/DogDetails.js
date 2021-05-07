import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./DogDetails.module.css";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const DogDetails = () => {
  const [details, setdetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(true);

  var url = useParams();
  useEffect(() => {
    async function callApi() {
      const res = await axios.get(`http://localhost:3001/dogs/${url.id}`);
      setdetails(res.data);
      setLoading(true);
    }
    callApi();
  }, [url]);

  if (!loading)
    return (
      <ReactLoading className={styles.loading} type={"spin"} color="#fff" />
    );

  return (
    <div className={styles.tv}>
      <div className={styles.container}>
        {url.id.length < 4
          ? details.map((e) => (
              <div key={e.name} className={styles.rela}>
                <h1>{e.name}</h1>
                <p>{e.temperament}</p>
                <p>Años de vida: {e.life_span}</p>
                <p>Peso: {e.weight}</p>
                <p>Altura: {e.height}</p>

                <img alt="dog" className={styles.image} src={e.image.url}></img>
              </div>
            ))
          : details.map((e) => (
              <div key={e.name} className={styles.rela}>
                <h1>{e.name}</h1>
                <div className={styles.juntar}>
                  {e.categories.map((
                    b //mapeo categorias inside de details
                  ) => (
                    <p key={b.name}>{b.name}, </p>
                  ))}
                </div>
                <p>Años de vida: {e.añosDeVida}</p>
                <p>
                  Peso: {e.weight_minimo}-{e.weight_maximo}
                </p>
                <p>
                  Altura: {e.height_minimo}-{e.height_maximo}
                </p>
              </div>
            ))}
        <Link className={styles.volver} to="/dogs">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default DogDetails;
