import "./product-card.styles.css";

import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { PokeContext } from "../../context/pokemon.context";
import { CartContext } from "../../context/cart.context";

import Button from "../../components/button/button.component";

const ProductCard = () => {
  const { name } = useParams();

  const { addItemToCart } = useContext(CartContext);

  const [chosenPokemon, setStatePokemon] = useState(name);

  let { pokemon } = useContext(PokeContext);

  pokemon = Object.values(pokemon);

  useEffect(() => {
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].name === name) {
        setStatePokemon(pokemon[i]);
        break;
      }
    }
  }, [name, pokemon]);

  const addPokemonToCart = () => {
    addItemToCart(chosenPokemon);
    setShowQuantity(false);

    setTimeout(() => {
      setShowQuantity(true);
    }, 1500);
  };

  const [showQuantity, setShowQuantity] = useState(true);

  return (
    <div className="container product-container">
      {!chosenPokemon.length ? (
        <Fragment>
          <div className="product-image">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${chosenPokemon.id}.png`}
              alt={chosenPokemon.name}
            />
          </div>
          <div className="product-description">
            <ul className="product-list">
              <li className="product-name">{chosenPokemon.name}</li>

              <li>ID: {chosenPokemon.id}</li>
              <li>Evolution: {chosenPokemon.evolution}</li>
              {typeof chosenPokemon.type === "string" ? (
                <li className="product-type">Type: {chosenPokemon.type}</li>
              ) : (
                <li>
                  Types:{" "}
                  {chosenPokemon.type
                    ? chosenPokemon.type.map((slot) => (
                        <span key={slot} className="product-type">
                          {slot}{" "}
                        </span>
                      ))
                    : null}
                </li>
              )}
            </ul>
            {chosenPokemon.discountPrice ? (
              <div className="price-block">
                <div className="prices">
                  <span className="discount-price">
                    {chosenPokemon.discountPrice} 円
                  </span>

                  <span className="normal-price">{chosenPokemon.price} 円</span>
                </div>
                <Button onClick={addPokemonToCart}>
                  {showQuantity ? "To cart" : "✔️"}
                </Button>
              </div>
            ) : (
              <div className="price-block">
                <div className="prices">
                  <span className="normal-price">{chosenPokemon.price} 円</span>
                </div>
                <Button onClick={addPokemonToCart}>
                  {showQuantity ? "To cart" : "✔️"}
                </Button>
              </div>
            )}
          </div>
        </Fragment>
      ) : (
        <h2 className="loading">Loading</h2>
      )}
    </div>
  );
};
export default ProductCard;
