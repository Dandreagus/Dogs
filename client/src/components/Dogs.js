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
import { FaSearch } from "react-icons/fa";
import ReactLoading from "react-loading";

const Dogs = () => {
  const [input, setInput] = useState({
    race: "",
  });

  const [maxPost] = useState(8);
  const [currentPage, setcurrentPage] = useState(1);
  const [temperamentos, settemperamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const miState = useSelector((state) => state);

  const onChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };
  const onClick = async (e) => {
    //raza
    e.preventDefault();
    const data = await axios.get(
      `http://localhost:3001/dogs?name=${input.race}`
    );
    setcurrentPage(1);
    dispatch(Search(data.data));
  };
  const onClickCreada = async () => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    setcurrentPage(1);
    dispatch(Creada(data.data));
  };
  const onClickExistente = async () => {
    const data = await axios.get(`http://localhost:3001/dogs`);
    dispatch(Existente(data.data));
  };

  const filtradoTemp = async (e) => {
    const dogsData = await axios.get("http://localhost:3001/dogs");
    dispatch(First(dogsData.data));
    setcurrentPage(1);
    dispatch(Temperamento(e));
  };

  const typing = miState.filter((x) =>
    x.name.toLowerCase().includes(input.race.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      const dogsData = await axios.get("http://localhost:3001/dogs");
      const temperamentosData = await axios.get(
        "http://localhost:3001/temperament"
      );

      dispatch(First(dogsData.data));
      settemperamentos(temperamentosData.data);
      setLoading(true);
    }
    fetchData();
  }, [dispatch]);

  const dogsTyping = input.race ? typing : miState;

  //paginacion
  const lastIndex = currentPage * maxPost;
  const firstIndex = lastIndex - maxPost;
  const posts = dogsTyping.slice(firstIndex, lastIndex);

  const pagina = (page) => setcurrentPage(page);

  if (!loading)
    return (
      <ReactLoading className={styles.loading} type={"spin"} color="#fff" />
    );

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.razas}>
          <button onClick={onClickExistente}>Raza Existente</button>
          <button onClick={onClickCreada}>Raza Creada</button>
        </div>
        <div className={styles.divSelect}>
          <div className={styles.colums}>
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
          <div className={styles.colums}>
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
        </div>

        <div className={styles.barra}>
          <form onSubmit={onClick}>
            <input
              className={styles.search}
              name="race"
              value={input.race}
              onChange={onChange}
            ></input>
            <button type="submit" className={styles.submitSearch}>
              <FaSearch />
            </button>
          </form>
        </div>
        <div className={styles.race}>
          <Link className={styles.redirec} to="/dog">
            Crear una nueva Raza
          </Link>

          <Link className={styles.redirec} to="/">
            Salir
          </Link>
        </div>
      </div>
      <div className={styles.dogs}>
        {!dogsTyping.length ? (
          <ResultOff />
        ) : (
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
        )}
      </div>
      <div className={styles.page}>
        <div className={styles.test}>
          <Pagination
            totalPost={typing.length}
            maxPost={maxPost}
            pagina={pagina}
            current={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dogs;
