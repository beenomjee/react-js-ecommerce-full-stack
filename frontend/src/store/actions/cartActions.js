import { ADD_TO_CART, MAKE_EMPTY_CART, REMOVE_FROM_CART } from "../constants";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});
export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});
export const makeEmptyCart = () => ({
  type: MAKE_EMPTY_CART,
});
