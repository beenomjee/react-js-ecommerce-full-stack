import { toast } from "react-toastify";
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
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants";
import axios from "axios";

const getMyOrdersRequest = () => ({
  type: GET_MY_ORDERS_REQUEST,
});
const getMyOrdersSuccess = () => ({
  type: GET_MY_ORDERS_SUCCESS,
});

const getMyOrdersFailure = () => ({
  type: GET_MY_ORDERS_FAILURE,
});

const getAllOrdersRequest = () => ({
  type: GET_ALL_ORDERS_REQUEST,
});
const getAllOrdersSuccess = () => ({
  type: GET_ALL_ORDERS_SUCCESS,
});

const getAllOrdersFailure = () => ({
  type: GET_ALL_ORDERS_FAILURE,
});

const deleteOrderRequest = () => ({
  type: DELETE_ORDER_REQUEST,
});
const deleteOrderSuccess = () => ({
  type: DELETE_ORDER_SUCCESS,
});

const deleteOrderFailure = () => ({
  type: DELETE_ORDER_FAILURE,
});

const updateOrderRequest = () => ({
  type: UPDATE_ORDER_REQUEST,
});
const updateOrderSuccess = () => ({
  type: UPDATE_ORDER_SUCCESS,
});

const updateOrderFailure = () => ({
  type: DELETE_ORDER_FAILURE,
});

export const getMyOrders = (token, cb) => async (dispatch) => {
  dispatch(getMyOrdersRequest());

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/orders/get-my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(getMyOrdersSuccess());
    cb(data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? err.message);
    dispatch(getMyOrdersFailure());
  }
};

export const getAllOrders = (token, cb) => async (dispatch) => {
  dispatch(getAllOrdersRequest());

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(getAllOrdersSuccess());
    cb(data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? err.message);
    dispatch(getAllOrdersFailure());
  }
};

export const deleteOrder = (id, token, cb) => async (dispatch) => {
  dispatch(deleteOrderRequest());

  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(deleteOrderSuccess());
    cb(data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? err.message);
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = (status, id, token, cb) => async (dispatch) => {
  dispatch(updateOrderRequest());

  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(updateOrderSuccess());
    cb(data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? err.message);
    dispatch(updateOrderFailure());
  }
};
