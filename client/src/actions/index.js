export function First(dogsData) {
  return {
    type: "INITIAL",
    payload: dogsData,
  };
}

export const Search = (data) => {
  return {
    type: "SEARCH",
    payload: data,
  };
};
export const Creada = (data) => {
  return {
    type: "CREADA",
    payload: data,
  };
};
export const Existente = (data) => {
  return {
    type: "EXISTENTE",
    payload: data,
  };
};
export const Temperamento = (data) => {
  return {
    type: "TEMPERAMENTO",
    payload: data,
  };
};
