import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Dogs from "./components/Dogs";
import Index from "./components/Index";
import CreateDog from "./components/CreateDog";
import DogDetails from "./components/DogDetails";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#78281F ",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
