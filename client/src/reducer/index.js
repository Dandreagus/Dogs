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

    default:
      return state;
  }
};

export default Reducer;
