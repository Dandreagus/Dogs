import { Link } from "react-router-dom";
import styles from "./Dog.module.css";

const Dog = ({ name, temperamento, image, id, categories }) => {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      {categories ? (
        categories.map((e) => <p key={e.name}>{e.name}</p>)
      ) : (
        <p>{temperamento}</p>
      )}
      <div className={styles.link}>
        <Link to={`/dogs/${id}`}>Ver Detalles</Link>
      </div>
    </div>
  );
};

export default Dog;
//<img className={styles.image} alt="dog" src={image}></img>
