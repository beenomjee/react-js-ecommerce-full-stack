import {
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAILURE,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  UPDATE_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants";

const initialState = {
  isLoading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
    case GET_ALL_ORDERS_REQUEST:
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_ORDER_FAILURE:
    case UPDATE_ORDER_SUCCESS:
    case GET_MY_ORDERS_FAILURE:
    case GET_MY_ORDERS_SUCCESS:
    case GET_ALL_ORDERS_FAILURE:
    case GET_ALL_ORDERS_SUCCESS:
    case DELETE_ORDER_FAILURE:
    case DELETE_ORDER_SUCCESS:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default orderReducer;
