import "./product-card.styles.css";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PokeContext } from "../../context/pokemon.context";
import { CartContext } from "../../context/cart.context";

import Button from "../../components/button/button.component";

const ProductCard = () => {
  const { name } = useParams();

  const { addItemToCart } = useContext(CartContext);

  const [chosenPokemon, setStatePokemon] = useState(name);

  const { pokemon } = useContext(PokeContext);

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
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + 3);
    console.log(datetime);
  };

  return (
    <div className="container product-container">
      <div className="product-image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${chosenPokemon.id}.png`}
          alt="{chosenPokemon.name"
        />
      </div>
      <div className="product-description">
        <ul className="product-list">
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
            <Button onClick={addPokemonToCart}> Buy </Button>
          </div>
        ) : (
          <div className="price-block">
            <div className="prices">
              <span className="normal-price">{chosenPokemon.price} 円</span>
            </div>
            <Button onClick={addPokemonToCart}> Buy </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
