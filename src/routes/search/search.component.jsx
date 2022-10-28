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
            <h2 className="container loading">
              No results for {location.state.searchField}
            </h2>
          )}
        </div>
      ) : (
        <h2 className="cards-container container loading">No results</h2>
      )}
    </div>
  );
};

export default Search;
