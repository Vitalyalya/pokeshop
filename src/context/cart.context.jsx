import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // console.log(productToAdd);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

const reduceByOne = (cartItems, productToReduce) => {
  if (productToReduce.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToReduce.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else return cartItems;
};

const increaseByOne = (cartItems, productToReduce) => {
  return cartItems.map((cartItem) =>
    cartItem.id === productToReduce.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartTotal: 0,
  addCartTotal: () => {},
  removeItemFromCart: () => {},
  reduceItemQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const reduceItemQuantity = (productToRemove) => {
    setCartItems(reduceByOne(cartItems, productToRemove));
  };

  const increaseItemQuantity = (productToRemove) => {
    setCartItems(increaseByOne(cartItems, productToRemove));
  };

  const addItemToCart = (productToAdd) => {
    // console.log(productToAdd);
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    addItemToCart,
    setCartItems,
    cartItems,
    cartCount,
    cartTotal,
    removeItemFromCart,
    reduceItemQuantity,
    increaseItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
