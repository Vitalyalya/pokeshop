import { createContext } from "react";

import file from "./pokemon.json";

const pokemon = file.pokemon;

export const PokeContext = createContext({ pokemon });

export const PokeProvider = ({ children }) => {
  const value = pokemon;
  //   return <PokeContext.Provider value={value}>{children}</PokeContext.Provider>;
  return <PokeContext.Provider value={value}>{children}</PokeContext.Provider>;
};
