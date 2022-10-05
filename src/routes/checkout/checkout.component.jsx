import "./checkout.styles.css";
import CartItem from "../../components/cart-item/cart-item.component";
import Button from "../../components/button/button.component";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import { addOrder } from "../../components/utils/firebase.util";

const Checkout = () => {
  const addOrderHandler = () => {
    addOrder(cartItems, currentUser);
  };

  const { cartItems, cartTotal } = useContext(CartContext);

  const { currentUser } = useContext(UserContext);

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
      {cartItems.map((item) => (
        <CartItem key={item.id} pokemon={item} />
      ))}
      <div className="total">
        {!cartTotal ? `TOTAL: ${cartTotal}` : `TOTAL: ${cartTotal} 円`}
        <Button onClick={addOrderHandler}>Place an Order</Button>
      </div>
    </div>
  );
};

export default Checkout;
