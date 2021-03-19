const initialState = [];

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL": {
      return (state = action.payload);
    }
    case "SEARCH": {
      return (state = action.payload);
    }
    case "CREADA": {
      return (state = action.payload.filter((e) => typeof e.id != "number"));
    }
    case "EXISTENTE": {
      return (state = action.payload.filter((e) => typeof e.id === "number"));
    }
    case "ASCENDENTE": {
      return (state = [...state].sort((a, b) => a.name.localeCompare(b.name)));
    }
    case "DESCENDENTE": {
      return (state = [...state].sort((a, b) =>
        a.name.localeCompare(b.name)
      )).reverse();
    }
    case "MENOR": {
      return (state = [...state].sort((a, b) => {
        if (a.weight_minimo < b.weight_minimo) return -1;
        return a.weight_minimo > b.weight_minimo ? 1 : 0;
      }));
    }
    case "MAYOR": {
      return (state = [...state].sort((a, b) => {
        if (a.weight_minimo < b.weight_minimo) return -1;
        return a.weight_minimo > b.weight_minimo ? 1 : 0;
      })).reverse();
    }
    case "TEMPERAMENTO": {
      var temperamentos = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].temperament) {
          state[i].temperament.includes(action.payload)
            ? temperamentos.push(state[i])
            : i++;
        }
        if (state[i].categories) {
          const buscar = state[i].categories.filter((e) =>
            e.name.includes(action.payload)
          );
          buscar.length !== 0 ? temperamentos.push(state[i]) : i++;
        }
      }
      return (state = [...temperamentos]);
    }

    default:
      return state;
  }
};
export default Reducer;
