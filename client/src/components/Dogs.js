import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dogs.module.css";
import axios from "axios";
import Dog from "./Dog";
import {
  First,
  Search,
  Creada,
  Existente,
  Temperamento,
} from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Paginatios";
import ResultOff from "./ResultOff";

const Dogs = () => {
  const [input, setInput] = useState({
    race: "",
  });

  const [maxPost] = useState(8);
  const [currentPage, setcurrentPage] = useState(1);
  const [temperamentos, settemperamentos] = useState([]);

  //Redux
  const dispatch = useDispatch();
  const miState = useSelector((state) => state);

  const onChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };
  const onClick = async (e) => {
    e.preventDefault();
    const data = await axios.get(
      `http://localhost:3001/dogs?name=${input.race}`
    );
    setcurrentPage(1);
    dispatch(Search(data.data));
  };
  const onClickCreada = async (e) => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    setcurrentPage(1);
    dispatch(Creada(data.data));
  };
  const onClickExistente = async (e) => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    dispatch(Existente(data.data));
  };

  const filtradoTemp = async (e) => {
    const dogsData = await axios.get("http://localhost:3001/dogs");
    dispatch(First(dogsData.data));
    setcurrentPage(1);
    dispatch(Temperamento(e));
  };

  useEffect(() => {
    async function fetchData() {
      const dogsData = await axios.get("http://localhost:3001/dogs");
      const temperamentosData = await axios.get(
        "http://localhost:3001/temperament"
      );

      dispatch(First(dogsData.data));
      settemperamentos(temperamentosData.data);
    }
    fetchData();
  }, [dispatch]);

  //paginacion
  const lastIndex = currentPage * maxPost;
  const firstIndex = lastIndex - maxPost;
  const posts = miState.slice(firstIndex, lastIndex);

  const pagina = (page) => setcurrentPage(page);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.razas}>
          <button onClick={onClickExistente}>Raza Existente</button>
          <button onClick={onClickCreada}>Raza Creada</button>
        </div>
        <div className={styles.divSelect}>
          <label>Ordenar</label>
          <select
            className={styles.eleccion}
            onChange={(e) => dispatch({ type: e.target.value })}
          >
            {/* ordenamiento*/}
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
            <option value="MENOR">Menor peso</option>
            <option value="MAYOR">Mayor peso</option>
          </select>
        </div>
        <div className={styles.divTemp}>
          {/*select temperamentos*/}
          <label>Filtrar por temperamentos</label>
          <select
            id="1"
            className={styles.eleccion}
            onChange={(e) => filtradoTemp(e.target.value)}
          >
            {temperamentos.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
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
        {miState.length !== 0 ? (
          posts.map((
            e //mapeo dogs
          ) => (
            <div key={e.name}>
              <Dog
                name={e.name}
                image={e.image}
                temperamento={e.temperament}
                categories={e.categories}
                id={e.id}
              />
            </div>
          ))
        ) : (
          <ResultOff />
        )}
      </div>
      <Pagination
        totalPost={miState.length}
        maxPost={maxPost}
        pagina={pagina}
      />
      <div className={styles.race}>
        <div>
          <Link className={styles.redirec} to="/dog">
            Crear una nueva Raza
          </Link>
        </div>
        <div>
          <Link className={styles.redirec} to="/">
            Salir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dogs;
