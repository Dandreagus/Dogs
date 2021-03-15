import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Dogs from "./components/Dogs";
import Index from "./components/Index";
import CreateDog from "./components/CreateDog";
import DogDetails from "./components/DogDetails";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/dog">
        <CreateDog />
      </Route>
      <Route exact path="/dogs/:id">
        <DogDetails />
      </Route>
      <Route exact path="/">
        <Index />
      </Route>
      <Route exact path="/dogs">
        <Dogs />
      </Route>
    </BrowserRouter>
  );
}

export default App;
