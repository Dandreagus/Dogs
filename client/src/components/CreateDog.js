import { Link } from "react-router-dom";
import styles from "./CreateDog.module.css";
import axios from "axios";
import React, { useState } from "react";
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

  const { register, handleSubmit, errors } = useForm();

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
    /* e.preventDefault();
    if (!name) return alert("Ingresa un nombre");
    if (!altura_max) return alert("Ingresa una altura maxima valida");
    if (!altura_min) return alert("Ingresa una altura minima valida");
    if (!peso_max) return alert("Ingresa un peso maximo");
    if (!peso_min) return alert("Ingresa un peso minimo valido");
    if (!años_vida) return alert("Ingrese años de vida"); */
    axios.post("http://localhost:3001/dog", {
      name,
      altura_max,
      altura_min,
      peso_max,
      peso_min,
      años_vida,
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

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onHandleCLick)}>
          <label for="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={change.name}
            onChange={onHandleChange}
            ref={register({ required: true })}
          ></input>
          {errors.name && <p className={styles.pError}>Ingrese un nombre</p>}
          <label for="altura_min">Altura minima</label>
          <input
            id="altura_min"
            type="number"
            name="altura_min"
            value={change.altura_min}
            onChange={onHandleChange}
            ref={register({ required: true })}
          ></input>

          <label for="altura_max">Altura maxima</label>
          <input
            id="altura_max"
            type="number"
            name="altura_max"
            value={change.altura_max}
            onChange={onHandleChange}
          ></input>
          <label for="peso_min">Peso minimo</label>
          <input
            id="peso_min"
            type="number"
            name="peso_min"
            value={change.peso_min}
            onChange={onHandleChange}
          ></input>
          <label for="peso_max">Peso maximo</label>
          <input
            id="peso_min"
            type="number"
            name="peso_max"
            value={change.peso_max}
            onChange={onHandleChange}
          ></input>
          <label for="años_vida">Años de Vida</label>
          <input
            id="años_vida"
            type="number"
            name="años_vida"
            value={change.años_vida}
            onChange={onHandleChange}
          ></input>
          <button type="submit" className={styles.create}>
            Crear
          </button>
          {!errors && <p>Creado con exito</p>}
        </form>
      </div>
      <div className={styles.race}>
        <Link to="/dogs">Volver</Link>
      </div>
    </div>
  );
};

export default CreateDog;
