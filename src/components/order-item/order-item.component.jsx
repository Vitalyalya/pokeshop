import "./order-item.styles.css";

const OrderItem = ({ pokemon }) => {
  const { name, id, type, evolution, price, quantity } = pokemon;

  // console.log(pokemon);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt={`${name}`}
        />
      </div>
      <span className="order-item-name">
        {name}
        <div className="d-flex gap-2 ">
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
        <span className="order-item-evolution">evolution: {evolution}</span>
      </span>
      <span className="order-item-quantity">
        <span className="order-item-value">Quantity: {quantity}</span>
      </span>
      <span className="order-item-price">Price: {price} 円</span>
    </div>
  );
};

export default OrderItem;
