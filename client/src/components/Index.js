import styles from "./Index.module.css";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className={styles.App}>
      <Link to="/dogs">
        <button className={styles.ingresar}> Ingresar</button>
      </Link>
      /
    </div>
  );
};
export default Index;
