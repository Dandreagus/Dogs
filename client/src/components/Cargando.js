import React from "react";
import styles from "./ResultOff.module.css";
import sad from "./image/unnamed.jpg";

const ResultOff = () => {
  return (
    <div className={styles.container}>
      <h2>Cargando...</h2>
      <img className={styles.imag} src={sad} alt="sad"></img>
    </div>
  );
};

export default ResultOff;
