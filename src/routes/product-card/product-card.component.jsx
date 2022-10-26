import "./product-card.styles.css";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PokeContext } from "../../context/pokemon.context";
import { CartContext } from "../../context/cart.context";

import Button from "../../components/button/button.component";

const ProductCard = () => {
  const { name } = useParams();

  const { addItemToCart, cartTotal, cartItems } = useContext(CartContext);

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

  // console.log(chosenPokemon);

  const addPokemonToCart = () => {
    addItemToCart(chosenPokemon);
  };
  console.log(cartTotal);
  console.log(cartItems);

  return (
    <div className="container product-container">
      <div className="product-image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${chosenPokemon.id}.png`}
          alt="{chosenPokemon.name"
        />
      </div>
      <div className="product-description">
        <span>
          <ul className="product-list">
            <li>ID: {chosenPokemon.id}</li>
            <li>Evolution: {chosenPokemon.evolution}</li>
            {
              typeof chosenPokemon.type === "string" ? (
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
              )
              // null}
            }
            {chosenPokemon.discountPrice ? (
              <div className="price-block">
                <li>
                  <s className="discount-price">{chosenPokemon.price} 円</s>
                </li>
                <li>{chosenPokemon.discountPrice} 円</li>
                <Button onClick={addPokemonToCart}> Buy </Button>
              </div>
            ) : (
              <div className="price-block">
                <li>{chosenPokemon.price} 円</li>
                <Button onClick={addPokemonToCart}> Buy </Button>
              </div>
            )}
          </ul>
        </span>
      </div>
    </div>
  );
};
export default ProductCard;
