import { useLocation } from "react-router-dom";

import PokeCard from "../../components/card/card.component";

const Search = () => {
  const location = useLocation();

  return (
    <div className="container">
      {location.state ? (
        <div className="cards-container">
          {location.state.filteredPokemon.length ? (
            location.state.filteredPokemon.map((pokemon) => {
              return <PokeCard key={pokemon.id} pokemon={pokemon} />;
            })
          ) : (
            <div className="container cart-empty">
              No results for {location.state.searchField}
            </div>
          )}
        </div>
      ) : (
        <div className="cards-container container cart-empty">No results</div>
      )}
    </div>
  );
};

export default Search;
