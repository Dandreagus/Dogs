import { Link } from "react-router-dom";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPost, maxPost, pagina, current }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / maxPost); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.caja}>
      <ul className={styles.page}>
        {pages.map((page) => (
          <div key={page} className={styles.caja}>
            <Link
              to="#!"
              className={styles.link}
              style={{ backgroundColor: page === current ? "maroon" : "white" }}
              onClick={() => pagina(page)}
            >
              {page}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
