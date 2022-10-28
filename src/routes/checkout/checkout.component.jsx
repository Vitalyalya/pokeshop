import "./checkout.styles.css";
import CartItem from "../../components/cart-item/cart-item.component";
import Button from "../../components/button/button.component";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import { addOrder } from "../../components/utils/firebase.util";

import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, setCartItems, cartTotal } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const cartItemsFromStorage = JSON.parse(localStorage.getItem("cart"));

  console.log(cartItemsFromStorage);

  const addOrderHandler = () => {
    if (currentUser) {
      addOrder(cartItems, currentUser);
    }
    alert("Success!");
    navigate("/");
    setCartItems([]);
  };

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
      {/* {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} pokemon={item} />)
      ) : (
        <h2 className="loading">Cart is empty</h2>
      )} */}
      {cartItemsFromStorage ? (
        cartItemsFromStorage.map((item) => (
          <CartItem key={item.id} pokemon={item} />
        ))
      ) : (
        <h2 className="loading">Cart is empty</h2>
      )}
      <div className="total">
        {!cartTotal ? `TOTAL: ${cartTotal}` : `TOTAL: ${cartTotal} 円`}
        {cartItemsFromStorage ? (
          <Button onClick={addOrderHandler}>Place an Order</Button>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
