import "./cart-item.styles.css";

const CartItem = ({ pokemon }) => {
  const { name, id, type, evolution, price, discountPrice, quantity } = pokemon;

  console.log(pokemon);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt={`${name}`}
        />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow">&#10094;</div>
        <span className="value">1</span>
        <div className="arrow">&#10095;</div>
      </span>
      <span className="price"> {price}</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};

export default CartItem;
