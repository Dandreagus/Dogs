import { Link } from "react-router-dom";
import styles from "./Dog.module.css";
import logo from "./image/coraje.jpg";

const Dog = ({ name, temperamento, image, id, categories }) => {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      {categories ? (
        <img className={styles.image} alt="dog" src={logo}></img>
      ) : null}
      {categories ? (
        categories.map((e) => <p key={e.name}>{e.name}</p>)
      ) : (
        <div>
          <img className={styles.image} alt="dog" src={image.url}></img>
          <p className={styles.temperamento}>{temperamento}</p>
        </div>
      )}
      <div className={styles.link}>
        <Link className={styles.detalles} to={`/dogs/${id}`}>
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default Dog;
