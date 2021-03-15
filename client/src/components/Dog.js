import { Link } from "react-router-dom";
import styles from "./Dog.module.css";

const Dog = ({ name, temperamento, image, id }) => {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <img className={styles.image} alt="dog" src={image}></img>
      <p>{temperamento}</p>
      <div className={styles.link}>
        <Link to={`/dogs/${id}`}>Ver Detalles</Link>
      </div>
    </div>
  );
};

export default Dog;
