import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
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
  } else {
    return cartItems;
  }
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
  setCartTotal: () => {},
  addCartTotal: () => {},
  removeItemFromCart: () => {},
  reduceItemQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const cartItemsCheck = JSON.parse(localStorage.getItem("cart"));
  let cartItemsVar = [];
  if (cartItemsCheck) {
    cartItemsVar = cartItemsCheck;
  }

  const [cartItems, setCartItems] = useState(cartItemsVar);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
    if (cartItems.length >= 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, cartItemsCheck]);

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
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    addItemToCart,
    setCartItems,
    cartItems,
    cartTotal,
    setCartTotal,
    removeItemFromCart,
    reduceItemQuantity,
    increaseItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
