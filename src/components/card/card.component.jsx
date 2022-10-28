import Button from "../button/button.component";

import { Link } from "react-router-dom";

import { useContext, useState, Fragment } from "react";
import { CartContext } from "../../context/cart.context";

import "./card.styles.css";

const PokeCard = ({ pokemon }) => {
  const { name, id, type, evolution, price, discountPrice } = pokemon;

  const [showQuantity, setShowQuantity] = useState(true);

  const { addItemToCart } = useContext(CartContext);

  const addPokemonToCart = () => {
    addItemToCart(pokemon);
    setShowQuantity(false);

    setTimeout(() => {
      setShowQuantity(true);
    }, 1500);
  };

  return (
    <Fragment>
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
            {pokemon.new ? (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                NEW
                <span className="visually-hidden">NEW</span>
              </span>
            ) : null}
            <div className="title-product">
              <h3>{name}</h3>
            </div>
            <div className="category">
              {typeof type === "object" ? (
                type.map((slot) => <span key={slot}>{slot.toUpperCase()}</span>)
              ) : (
                <span>{type.toUpperCase()}</span>
              )}
            </div>
            <h5>Evolution: {evolution}</h5>
          </div>
        </Link>
        <div className="footer-card">
          <Fragment>
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
              <Fragment>
                <h4>{price} 円</h4>
              </Fragment>
            )}
          </Fragment>
          <Button
            buttonType="light"
            id="liveToastBtn"
            onClick={addPokemonToCart}
          >
            {showQuantity ? "To cart" : "✔️"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default PokeCard;
