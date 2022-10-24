import "./home.styles.css";

import { useContext } from "react";
import { PokeContext } from "../../context/pokemon.context";

import PokeCard from "../../components/card/card.component";
import Carousel from "../../components/carousel/carousel.component";
// import DropdownPanel from "../../components/dropdowns/dropdowns.component";

const Home = () => {
  const { pokemon } = useContext(PokeContext);

  const discPokemon = [];
  const newPokemon = [];

  pokemon.map((pokemon) => {
    if (pokemon.discountPrice) {
      discPokemon.push(pokemon);
    } else if (pokemon.new) {
      newPokemon.push(pokemon);
    }
    return discPokemon;
  });

  return (
    <div className="container">
      {/* <DropdownPanel /> */}
      <Carousel />
      <section>
        <h1>Discounts:</h1>
        <div className="cards-container">
          {discPokemon
            .filter((_, idx) => idx < 6)
            .map((pokemon) => {
              return <PokeCard key={pokemon.id} pokemon={pokemon} />;
            })}
        </div>
        <h4 className="text-center mt-5">More Discounts</h4>
      </section>
      <h1 className="mt-5">New arrivals:</h1>
      <div className="cards-container">
        {newPokemon
          .filter((_, idx) => idx < 6)
          .map((pokemon) => {
            return <PokeCard key={pokemon.id} pokemon={pokemon} />;
          })}
      </div>
    </div>
  );
};

export default Home;
