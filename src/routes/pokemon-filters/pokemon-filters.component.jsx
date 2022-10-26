import "./pokemon-filters.styles.css";

import { useContext, useEffect } from "react";
import { PokeContext } from "../../context/pokemon.context";

import DropdownPanel from "../../components/dropdowns/dropdowns.component";
import PokeCard from "../../components/card/card.component";

const PokemonFilters = () => {
  const { filterSettings, filteredPokemon, setFilteredPokemon, pokemon } =
    useContext(PokeContext);

  let pokeArr = [];
  const checkPokemon = (pokemon, check) => {
    if (check) {
      const pokeString = JSON.stringify(pokemon)
        .toLowerCase()
        .replace(/"/g, "");
      if (
        !pokeString.includes(filterSettings.toLowerCase().replace(/"/g, ""))
      ) {
        pokeArr.push(pokemon);
      }
    } else {
      if (
        JSON.stringify(pokemon)
          .toLowerCase()
          .replace(/"/g, "")
          .includes(
            filterSettings.toLowerCase().replace(/"/g, "").replace(" ", "")
          )
      ) {
        pokeArr.push(pokemon);
      }
    }
    return pokeArr;
  };

  useEffect(() => {
    pokemon.map((pokemon) => {
      if (filterSettings === "discountprice:null") {
        checkPokemon(pokemon, true);
      } else {
        checkPokemon(pokemon, false);
      }
      return pokeArr;
    });
    setFilteredPokemon(pokeArr);
  });

  return (
    <div className="container">
      <DropdownPanel />
      <div className="cards-container">
        {filteredPokemon.map((pokemon) => {
          return <PokeCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
};

export default PokemonFilters;
