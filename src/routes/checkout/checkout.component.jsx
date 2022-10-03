import "./checkout.styles.css";
import CartItem from "../../components/cart-item/cart-item.component";

const Checkout = () => {
  let pokemon = {
    name: "slowpoke",
    url: "https://pokeapi.co/api/v2/pokemon-species/79/",
    id: "79",
    type: ["water", "psychic"],
    evolution: "1",
    price: 3230,
    legendary: false,
    discountPrice: null,
    new: true,
  };

  //   console.log(pokemon.name);

  return (
    <div className="checkout-container container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {pokemon ? <CartItem pokemon={pokemon} /> : null}
      <div className="total">TOTAL: </div>
    </div>
  );
};

export default Checkout;
