import { Link } from "react-router-dom";
import styles from "./CreateDog.module.css";
const CreateDog = () => {
  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form}>
          <label for="name">Nombre</label>
          <input type="text" name="name"></input>
          <label for="altura_min">Altura minima</label>
          <input type="text" name="altura_min"></input>
          <label for="altura_max">Altura maxima</label>
          <input type="text" name="altura_max"></input>
          <label for="peso_min">Peso minimo</label>
          <input type="text" name="peso_min"></input>
          <label for="peso_max">Peso maximo</label>
          <input type="text" name="peso_max"></input>
          <label for="años_vida">Años de Vida</label>
          <input type="text" name="años_vida"></input>
          <button className={styles.create}>Crear</button>
        </form>
      </div>
      <div className={styles.race}>
        <Link to="/dogs">Volver</Link>
      </div>
    </div>
  );
};

export default CreateDog;
