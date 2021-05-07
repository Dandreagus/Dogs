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

import { Button, MenuItem, Select } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Dogs = () => {
  const [input, setInput] = useState({
    race: "",
  });

  const [dogs, setDogs] = useState([]);
  const [maxPost] = useState(8);
  const [currentPage, setcurrentPage] = useState(1);
  const [temperamentos, settemperamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState("ASCENDENTE");

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
    setcurrentPage(1);
    console.log(dogs);
    dispatch(Creada(dogs));
  };
  const onClickExistente = async () => {
    dispatch(Existente(dogs));
  };

  const filtradoTemp = async (e) => {
    dispatch(First(dogs));
    setcurrentPage(1);
    dispatch(Temperamento(e));
  };

  const typing = miState.filter((x) =>
    x.name.toLowerCase().includes(input.race.toLowerCase())
  );

  const onSelect = (e) => {
    dispatch({ type: e.target.value });
    setSelect(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const dogsStorag = JSON.parse(localStorage.getItem("dogs"));

      if (dogsStorag.length === 0) {
        const dogsData = await axios.get("http://localhost:3001/dogs");
        dispatch(First(dogsData.data));
        setDogs(dogsData.data);
      } else {
        setDogs(dogsStorag);
      }
      const temperamentosData = await axios.get(
        "http://localhost:3001/temperament"
      );
      settemperamentos(temperamentosData.data);
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("dogs", JSON.stringify(dogs));
    localStorage.setItem("temperaments", JSON.stringify(temperamentos));
    dispatch(First(dogs));
  }, [temperamentos]);

  const dogsTyping = input.race ? typing : miState;

  //paginacion
  const lastIndex = currentPage * maxPost;
  const firstIndex = lastIndex - maxPost;
  const posts = dogsTyping.slice(firstIndex, lastIndex);

  const pagina = (page) => setcurrentPage(page);

  /*   if (!loading)
    return (
      <ReactLoading className={styles.loading} type={"spin"} color="#fff" />
    ); */

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.razas}>
          <Button
            style={{
              backgroundColor: "white",
              color: "#78281f",
              border: "1px solid #78281f",
              marginTop: 10,
            }}
            onClick={onClickExistente}
          >
            Raza Existente
          </Button>
          <Button
            style={{
              marginLeft: 5,
              backgroundColor: "white",
              color: "#78281f",
              border: "1px solid #78281f",
              marginTop: 10,
            }}
            onClick={onClickCreada}
          >
            Raza Creada
          </Button>
        </div>
        <div className={styles.divSelect}>
          <div className={styles.colums}>
            <label>Ordenar</label>
            <Select
              value={select}
              style={{ color: "#78281f" }}
              className={styles.eleccion}
              onChange={(e) => onSelect(e)}
            >
              {/* ordenamiento*/}
              <MenuItem value="ASCENDENTE">Ascendente</MenuItem>
              <MenuItem value="DESCENDENTE">Descendente</MenuItem>
              <MenuItem value="MENOR">Menor peso</MenuItem>
              <MenuItem value="MAYOR">Mayor peso</MenuItem>
            </Select>
          </div>
          <div className={styles.colums}>
            <label>Filtrar por temperamentos</label>
            <Select
              label="Seleccione un temperamento"
              style={{ color: "#78281f" }}
              id="1"
              className={styles.eleccion}
              onChange={(e) => filtradoTemp(e.target.value)}
            >
              <MenuItem disabled value="">
                <em>Seleccione un temperamento</em>
              </MenuItem>
              {temperamentos.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
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
            <Button
              style={{
                backgroundColor: "white",
                color: "#78281f",
                border: "1px solid #78281f",
                marginTop: 10,
              }}
            >
              Crear una nueva Raza
            </Button>
          </Link>

          <Link className={styles.redirec} to="/">
            <Button
              style={{
                backgroundColor: "white",
                color: "#78281f",
                border: "1px solid #78281f",
                marginTop: 10,
              }}
            >
              <ExitToAppIcon />
              Salir
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.dogs}>
        {posts.map((
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
        ))}
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
