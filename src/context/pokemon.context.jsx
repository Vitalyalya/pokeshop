import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../components/utils/firebase.util.jsx";
// import { addCollectionAndDocuments } from "../components/utils/firebase.util.jsx";

// import POKE_DATA from "./pokemon.js";

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

  // useEffect(() => {
  //   addCollectionAndDocuments("pokemon", POKE_DATA);
  // }, []);

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
