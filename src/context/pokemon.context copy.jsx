import { createContext, useState } from "react";

import file from "./pokemon.json";

const pokemon = file.pokemon;

export const PokeContext = createContext({
  pokemon,
  filterSettings: "",
  setFilterSetting: () => {},
  filteredPokemon: "",
  setFilteredPokemon: () => {},
});

export const PokeProvider = ({ children }) => {
  const [filterSettings, setFilterSettings] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
  const value = {
    pokemon,
    filterSettings,
    setFilterSettings,
    filteredPokemon,
    setFilteredPokemon,
  };
  return <PokeContext.Provider value={value}>{children}</PokeContext.Provider>;
};
