import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dogs.module.css";
import axios from "axios";
import Dog from "./Dog";
import { First, Search, Creada, Existente } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";

const Dogs = () => {
  const [input, setInput] = useState({
    race: "",
  });

  const onChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };

  //Redux
  const dispatch = useDispatch();
  const miState = useSelector((state) => state);

  const onClick = async (e) => {
    e.preventDefault();
    const data = await axios.get(
      `http://localhost:3001/dogs?name=${input.race}`
    );
    dispatch(Search(data.data));
  };
  const onClickCreada = async (e) => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    dispatch(Creada(data.data));
  };
  const onClickExistente = async (e) => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    dispatch(Existente(data.data));
  };

  useEffect(() => {
    async function fetchData() {
      const dogsData = await axios.get("http://localhost:3001/dogs");
      dispatch(First(dogsData.data));
    }
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.razas}>
          <button onClick={onClickExistente}>Raza Existente</button>
          <button onClick={onClickCreada}>Raza Creada</button>
        </div>

        <form onSubmit={onClick}>
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
        {miState.map((e) => (
          <div key={e.name}>
            <Dog
              name={e.name}
              //image={e.image.url}
              temperamento={e.temperament}
              categories={e.categories}
              id={e.id}
            />
          </div>
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
