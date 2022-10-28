import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../components/utils/firebase.util.jsx";

export const PokeContext = createContext({
  pokemon: {},
  filterSettings: "",
  setFilterSetting: () => {},
  filteredPokemon: "",
  setFilteredPokemon: () => {},
});

export const PokeProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const getPokemonMap = async () => {
      const pokemonMap = await getCategoriesAndDocuments();
      setPokemon(pokemonMap);
    };
    getPokemonMap();
  }, []);

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
