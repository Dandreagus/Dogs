import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dogs.module.css";
import axios from "axios";
import Dog from "./Dog";

const Dogs = () => {
  const [input, setInput] = useState({
    race: "",
  });
  const [dogs, setDogs] = useState([]);

  const onChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const dogsData = await axios.get("http://localhost:3001/dogs");
      setDogs(dogsData.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <form>
          <input
            className={styles.search}
            name="race"
            value={input.race}
            onChange={onChange}
          ></input>
          <button type="submit" className={styles.submitSearch}>
            Buscar
          </button>
        </form>
      </div>
      <div className={styles.dogs}>
        {dogs.map((e) => (
          <Dog
            key={e.name}
            name={e.name}
            image={e.image.url}
            temperamento={e.temperament}
            id={e.id}
          />
        ))}
      </div>
      <div className={styles.race}>
        <div>
          <Link to="/dog">Crear una nueva Raza</Link>
        </div>
        <div>
          <Link to="/">Salir</Link>
        </div>
      </div>
    </div>
  );
};

export default Dogs;
