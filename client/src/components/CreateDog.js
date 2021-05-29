import { Link } from "react-router-dom";
import styles from "./CreateDog.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import { MenuItem, Select } from "@material-ui/core";

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
      //const a ASDASD data = await axios.get("http://localhost:3001/temperament");
      const temperaments = JSON.parse(localStorage.getItem("temperaments"));
      setcategories(temperaments);
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

  const onHandleCLick = async (e) => {
    const indice = categoriasCargadas.map((e) => e.id);
    await axios.post("http://localhost:3001/dog", {
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
    setcategoriasCargadas([]);
    const dogsData = await axios.get("http://localhost:3001/dogs");
    localStorage.setItem("dogs", JSON.stringify(dogsData.data));
    return Swal.fire("Raza creada con exito");
  };

  console.log(categoriasCargadas);
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
      <div className={styles.tv}>
        <form className={styles.form} onSubmit={handleSubmit(onHandleCLick)}>
          <input
    placeholder="Nombre"
    type="text"
    name="name"
    id="name"
    value={change.name}
    onChange={onHandleChange}
    ref={register({required: true})}
    />
          {errors.name && <p className={styles.pError}>Ingrese un nombre</p>}

          <input
    placeholder="Altura minima"
    id="altura_min"
    type="number"
    name="altura_min"
    value={change.altura_min}
    onChange={onHandleChange}
    ref={register({required: true})}
    />
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
    />

          <input
    placeholder="Peso minimo"
    id="peso_min"
    type="number"
    name="peso_min"
    value={change.peso_min}
    onChange={onHandleChange}
    />

          <input
    placeholder="Peso maximo"
    id="peso_max"
    type="number"
    name="peso_max"
    value={change.peso_max}
    onChange={onHandleChange}
    />

          <input
    placeholder="Años de vida"
    id="años_vida"
    type="number"
    name="años_vida"
    value={change.años_vida}
    onChange={onHandleChange}
    />

          <div className={styles.posCategoria}>
            {categoriasCargadas //muestra las categorias seleccionadas
              ? categoriasCargadas.map((e) => (
                  <div key={e.name} className={styles.categoria}>
                    <IconContext.Provider value={{ color: "maroon", size: 25 }}>
                      <FiDelete onClick={() => deleteCategoria(e.id)} />
                    </IconContext.Provider>
                    <p className={styles.p}>{e.name}</p>
                  </div>
                ))
              : null}
          </div>
          <div className={styles.magia}>
            <label>Temperamentos:</label>
            <Select onChange={handleCategorias}>
              {categories.map((
                e,
                index //creando el select
              ) => (
                <MenuItem key={index} value={index + 1}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </div>
          <button type="submit" className={styles.create}>
            Crear
          </button>
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
