const initialState = [];

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Race": {
      return "hola";
    }

    default:
      return state;
  }
};

export default Reducer;
