import { Link } from "react-router-dom";
import styles from "./CreateDog.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateDog = () => {
  const [change, setchange] = useState({
    name: "",
    altura_min: "",
    altura_max: "",
    peso_min: "",
    peso_max: "",
    años_vida: "",
  });

  const [categories, setcategories] = useState([]);
  const [categoriasCargadas, setcategoriasCargadas] = useState([]);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    //cargo categorias
    async function tempe() {
      const data = await axios.get("http://localhost:3001/temperament");
      setcategories(data.data);
    }
    tempe();
  }, []);

  const onHandleChange = (e) => {
    setchange({
      ...change,
      [e.target.name]: e.target.value,
    });
  };

  const {
    name,
    altura_max,
    altura_min,
    peso_max,
    peso_min,
    años_vida,
  } = change;

  const onHandleCLick = (e) => {
    const indice = categoriasCargadas.map((e) => e.id);
    axios.post("http://localhost:3001/dog", {
      //post al back
      name,
      altura_max,
      altura_min,
      peso_max,
      peso_min,
      años_vida,
      indice,
    });
    setchange({
      name: "",
      altura_min: "",
      altura_max: "",
      peso_min: "",
      peso_max: "",
      años_vida: "",
    });
    return alert("Raza creada con exito");
  };

  //categorias cargadas para este perro
  const handleCategorias = (e) => {
    const name = categories.filter((a, i) => i === e.target.value - 1);
    setcategoriasCargadas([
      ...categoriasCargadas,
      { id: e.target.value, name: name[0] },
    ]);
    categoriasCargadas.map((b) =>
      b.name === name[0]
        ? null
        : setcategoriasCargadas([
            ...categoriasCargadas,
            { id: e.target.value, name: name[0] },
          ])
    );
  };

  //elimino categoria
  const deleteCategoria = (id) => {
    console.log(id);
    const eliminando = categoriasCargadas.filter((e) => e.id !== id);
    setcategoriasCargadas(eliminando);
  };

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onHandleCLick)}>
          <input
            placeholder="Nombre"
            type="text"
            name="name"
            id="name"
            value={change.name}
            onChange={onHandleChange}
            ref={register({ required: true })}
          ></input>
          {errors.name && <p className={styles.pError}>Ingrese un nombre</p>}

          <input
            placeholder="Altura minima"
            id="altura_min"
            type="number"
            name="altura_min"
            value={change.altura_min}
            onChange={onHandleChange}
            ref={register({ required: true })}
          ></input>
          {errors.altura_min && (
            <p className={styles.pError}>Ingrese una Altura minima</p>
          )}

          <input
            placeholder="Altura maxima"
            id="altura_max"
            type="number"
            name="altura_max"
            value={change.altura_max}
            onChange={onHandleChange}
          ></input>

          <input
            placeholder="Peso minimo"
            id="peso_min"
            type="number"
            name="peso_min"
            value={change.peso_min}
            onChange={onHandleChange}
          ></input>

          <input
            placeholder="Peso minimo"
            id="peso_min"
            type="number"
            name="peso_max"
            value={change.peso_max}
            onChange={onHandleChange}
          ></input>

          <input
            placeholder="Años de vida"
            id="años_vida"
            type="number"
            name="años_vida"
            value={change.años_vida}
            onChange={onHandleChange}
          ></input>
          <button type="submit" className={styles.create}>
            Crear
          </button>
          <div className={styles.posCategoria}>
            {categoriasCargadas //muestra las categorias seleccionadas
              ? categoriasCargadas.map((e) => (
                  <div className={styles.categoria}>
                    <p>{e.name}</p>
                    <button
                      type="button"
                      onClick={() => deleteCategoria(e.id)}
                      className={styles.delete}
                    >
                      x
                    </button>{" "}
                  </div>
                ))
              : null}
          </div>
          <div className={styles.magia}>
            <label>Temperamentos:</label>
            <select onChange={handleCategorias}>
              {categories.map((
                e,
                index //creando el select
              ) => (
                <option key={index} value={index + 1}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className={styles.race}>
        <Link className={styles.volver} to="/dogs">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default CreateDog;
