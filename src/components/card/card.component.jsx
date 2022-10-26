// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import Button from "../button/button.component";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./card.styles.css";

const PokeCard = ({ pokemon }) => {
  const { name, id, type, evolution, price, discountPrice } = pokemon;

  const { addItemToCart } = useContext(CartContext);

  const addPokemonToCart = () => {
    addItemToCart(pokemon);
  };

  // console.log(pokemon);

  return (
    <>
      <div className="wsk-cp-product">
        <Link to={`/pokemon/${pokemon.name}`}>
          <div className="wsk-cp-img">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
              alt="Product"
              className="img-responsive"
            />
          </div>
          <div className="wsk-cp-text">
            <div className="title-product">
              <h3>{name}</h3>
            </div>
            <div className="category">
              {typeof type === "object" ? (
                type.map((slot) => (
                  <span
                    key={slot}
                    // className="badge bg-info text-dark flex-grow-1"
                  >
                    {slot.toUpperCase()}
                  </span>
                ))
              ) : (
                <span>{type.toUpperCase()}</span>
              )}
            </div>
            <h5>Evolution: {evolution}</h5>
            {/* <div className="description-prod">
          </div> */}
          </div>
        </Link>
        <div className="footer-card">
          <>
            {pokemon.discountPrice ? (
              <div>
                <h5>
                  {price} 円
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    -20%
                  </span>
                </h5>
                <h4>{discountPrice} 円</h4>
              </div>
            ) : (
              <>
                <h4>{price} 円</h4>
              </>
            )}
          </>
          <Button buttonType="light" onClick={addPokemonToCart}>
            To cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default PokeCard;
