import "./cart-item.styles.css";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartItem = ({ pokemon }) => {
  const { name, id, type, evolution, price, quantity } = pokemon;

  const { removeItemFromCart, reduceItemQuantity, increaseItemQuantity } =
    useContext(CartContext);

  const removeHandler = () => {
    removeItemFromCart(pokemon);
  };

  const reduceItemQuantityHandler = () => {
    reduceItemQuantity(pokemon);
  };
  const increaseItemQuantityHandler = () => {
    increaseItemQuantity(pokemon);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt={`${name}`}
        />
      </div>
      <span className="name">
        {name}
        <div className="d-flex gap-2 flex-column w-75">
          {typeof type === "object" ? (
            type.map((slot) => (
              <span key={slot} className="badge bg-info text-dark ">
                {slot.toUpperCase()}
              </span>
            ))
          ) : (
            <span className="badge bg-info text-dark ">
              {type.toUpperCase()}
            </span>
          )}
        </div>
        <span className="evolution">evolution: {evolution}</span>
      </span>
      <span className="quantity">
        <div className="arrow" onClick={reduceItemQuantityHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseItemQuantityHandler}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={removeHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CartItem;
