import "./shop.styles.css";

import { useContext, useEffect } from "react";
import { PokeContext } from "../../context/pokemon.context";

import DropdownPanel from "../../components/dropdowns/dropdowns.component";
import PokeCard from "../../components/card/card.component";

const Shop = () => {
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
    // pokemon.map((pokemon) => {
    //   if (typeof pokemon.type === "object") {
    //     if (pokemon.type.includes(filterSettings)) {
    //       console.log(pokemon);
    //       pokeArr.push(pokemon);
    //     }
    //   } else if (Object.values(pokemon).includes(filterSettings)) {
    //     pokeArr.push(pokemon);
    //   }
    //   return pokeArr;
    // });
    pokemon.map((pokemon) => {
      if (filterSettings === "discountprice:null") {
        checkPokemon(pokemon, true);
      } else {
        checkPokemon(pokemon, false);
      }
      return pokeArr;
    });
    setFilteredPokemon(pokeArr);
  }, [filterSettings]);

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

export default Shop;
