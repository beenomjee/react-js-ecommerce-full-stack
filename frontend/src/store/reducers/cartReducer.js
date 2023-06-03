import { ADD_TO_CART, MAKE_EMPTY_CART, REMOVE_FROM_CART } from "../constants";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { items: [...state.items, action.payload] };
    case REMOVE_FROM_CART:
      return { items: state.items.filter((p) => p._id !== action.payload) };
    case MAKE_EMPTY_CART:
      return { items: [] };
    default:
      return state;
  }
};

export default cartReducer;
