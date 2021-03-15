import "./Index.css";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Link to="/dogs">
        <button className="ingresar">Ingresar</button>
      </Link>
      /
    </div>
  );
};
export default Index;
