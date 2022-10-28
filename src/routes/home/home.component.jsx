import "./home.styles.css";

import { useContext, Fragment } from "react";
import { PokeContext } from "../../context/pokemon.context";

import { Link } from "react-router-dom";

import PokeCard from "../../components/card/card.component";
import Carousel from "../../components/carousel/carousel.component";
import Button from "../../components/button/button.component";

const Home = () => {
  const { pokemon, setFilterSettings } = useContext(PokeContext);

  const discPokemon = [];
  const newPokemon = [];

  Object.values(pokemon).map((pokemon) => {
    if (pokemon.discountPrice) {
      discPokemon.push(pokemon);
    } else if (pokemon.new) {
      newPokemon.push(pokemon);
    }
    return discPokemon;
  });

  const clickHandler = (drop) => {
    setFilterSettings(drop.trim().toLowerCase());
  };

  return (
    <div className="container">
      <Carousel />
      <section>
        <h2 className="mt-5">Discounts:</h2>
        {Object.values(pokemon).length ? (
          <Fragment>
            <div className="cards-container">
              {discPokemon
                .filter((_, idx) => idx < 8)
                .map((pokemon) => {
                  return <PokeCard key={pokemon.id} pokemon={pokemon} />;
                })}
            </div>
            <div className="text-center button-home">
              <Link to="/pokemon">
                <Button onClick={() => clickHandler("discountPrice:null")}>
                  More Discounts
                </Button>
              </Link>
            </div>
          </Fragment>
        ) : (
          <h2 className="loading text-center">Loading</h2>
        )}
      </section>
      <section>
        <h2 className="mt-5">New arrivals:</h2>
        {Object.values(pokemon).length ? (
          <Fragment>
            <div className="cards-container">
              {newPokemon
                .filter((_, idx) => idx < 8)
                .map((pokemon) => {
                  return <PokeCard key={pokemon.id} pokemon={pokemon} />;
                })}
            </div>
            <div className="text-center button-home">
              <Link to="/pokemon">
                <Button onClick={() => clickHandler("new:true")}>
                  More New Pokemon
                </Button>
              </Link>
            </div>
          </Fragment>
        ) : (
          <h2 className="loading text-center">Loading</h2>
        )}
      </section>
    </div>
  );
};

export default Home;
