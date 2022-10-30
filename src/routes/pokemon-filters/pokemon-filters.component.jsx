import { useContext, useEffect } from "react";
import { PokeContext } from "../../context/pokemon.context";

import DropdownPanel from "../../components/dropdowns/dropdowns.component";
import PokeCard from "../../components/card/card.component";
import Loader from "../../components/loader/loader.component";

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
    Object.values(pokemon).map((pokemon) => {
      if (filterSettings === "discountprice:null") {
        checkPokemon(pokemon, true);
      } else {
        checkPokemon(pokemon, false);
      }

      return pokeArr;
    });
    setFilteredPokemon(pokeArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSettings, pokemon]);

  return (
    <div className="container">
      <DropdownPanel />
      {Object.values(pokemon).length ? (
        <div className="cards-container">
          {Object.values(filteredPokemon).map((pokemon) => {
            return <PokeCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      ) : (
        <div className="cards-container">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PokemonFilters;
