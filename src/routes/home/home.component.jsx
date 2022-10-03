import "./home.styles.css";

import { useContext } from "react";
import { PokeContext } from "../../context/pokemon.context";

import PokeCard from "../../components/card/card.component";
import Carousel from "../../components/carousel/carousel.component";
import Dropdown from "../../components/dropdown/dropdown.component";

const Home = () => {
  const pokemon = useContext(PokeContext);

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
      <Carousel />
      <section className="dropdown-section">
        <Dropdown name="Evolutions" drops={"Evo 1,Evo 2,Evo 3"} />
        <Dropdown
          name="Types"
          drops={
            "Bug, Dragon, Electric,Fighting,Fire,Flying,Ghost,Grass,Ground,Ice,Normal,Poison,Psychic,Rock,Water"
          }
        />
        <button type="button" className="btn btn-primary">
          New
        </button>
        <button type="button" className="btn btn-primary">
          Discounts
        </button>
      </section>
      <section>
        <h1>Discounts:</h1>
        <div className="cards-container">
          {discPokemon
            .filter((item, idx) => idx < 6)
            .map((pokemon) => {
              return <PokeCard key={pokemon.id} pokemon={pokemon} />;
            })}
        </div>
        <h4 className="text-center mt-5">More Discounts</h4>
      </section>
      <h1 className="mt-5">New arrivals:</h1>
      <div className="cards-container">
        {newPokemon
          .filter((item, idx) => idx < 6)
          .map((pokemon) => {
            return <PokeCard key={pokemon.id} pokemon={pokemon} />;
          })}
      </div>
    </div>
  );
};

export default Home;
