import { toast } from "react-toastify";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_FOR_HOME_PAGE_FAILURE,
  GET_PRODUCTS_FOR_HOME_PAGE_REQUEST,
  GET_PRODUCTS_FOR_HOME_PAGE_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants";
import axios from "axios";

const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});
const createProductSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS,
});

const createProductFailure = () => ({
  type: CREATE_PRODUCT_FAILURE,
});

const updateProductRequest = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});
const updateProductSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS,
});

const updateProductFailure = () => ({
  type: UPDATE_PRODUCT_FAILURE,
});

const getAllProductRequest = () => ({
  type: GET_ALL_PRODUCTS_REQUEST,
});
const getAllProductSuccess = (payload) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: payload,
});
const getAllProductFailure = () => ({
  type: GET_ALL_PRODUCTS_FAILURE,
});

const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});
const deleteProductSuccess = (payload) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: payload,
});
const deleteProductFailure = () => ({
  type: DELETE_PRODUCT_FAILURE,
});

const getProductsForHomePageRequest = () => ({
  type: GET_PRODUCTS_FOR_HOME_PAGE_REQUEST,
});
const getProductsForHomePageSuccess = (payload) => ({
  type: GET_PRODUCTS_FOR_HOME_PAGE_SUCCESS,
  payload: payload,
});
const getProductsForHomePageFailure = () => ({
  type: GET_PRODUCTS_FOR_HOME_PAGE_FAILURE,
});

const getProductByIdRequest = () => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
});
const getProductByIdSuccess = (payload) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: payload,
});
const getProductByIdFailure = () => ({
  type: GET_PRODUCT_BY_ID_FAILURE,
});

const getProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});
const getProductsSuccess = () => ({
  type: GET_PRODUCTS_SUCCESS,
});
const getProductsFailure = () => ({
  type: GET_PRODUCTS_FAILURE,
});

const searchProductsRequest = () => ({
  type: SEARCH_PRODUCT_REQUEST,
});
const searchProductsSuccess = () => ({
  type: SEARCH_PRODUCT_SUCCESS,
});
const searchProductsFailure = () => ({
  type: SEARCH_PRODUCT_FAILURE,
});

export const createProduct = (sendingData, token, cb) => async (dispatch) => {
  dispatch(createProductRequest());

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/products`,
      sendingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(createProductSuccess());
    cb(data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? err.message);
    dispatch(createProductFailure());
  }
};

export const updateProduct =
  (sendingData, id, token, cb) => async (dispatch) => {
    dispatch(updateProductRequest());

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        sendingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateProductSuccess());
      cb(data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? err.message);
      dispatch(updateProductFailure());
    }
  };

export const getAllProducts =
  (token, cb = () => null) =>
  async (dispatch) => {
    dispatch(getAllProductRequest());

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getAllProductSuccess(data));
      cb(data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? err.message);
      dispatch(getAllProductFailure());
    }
  };

export const deleteProduct = (token, id, cb) => async (dispatch) => {
  dispatch(deleteProductRequest());

  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(deleteProductSuccess(id));
    cb(data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? err.message);
    dispatch(deleteProductFailure());
  }
};

export const getProductsForHomePage =
  (cb = () => null) =>
  async (dispatch) => {
    dispatch(getProductsForHomePageRequest());
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/getProductsForHomePage`
      );

      dispatch(getProductsForHomePageSuccess(data));
      cb(data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? err.message);
      dispatch(getProductsForHomePageFailure());
    }
  };

export const getProductById =
  (id, cb = () => null) =>
  async (dispatch) => {
    dispatch(getProductByIdRequest());
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
      );

      dispatch(getProductByIdSuccess(data));
      cb(data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? err.message);
      dispatch(getProductByIdFailure());
    }
  };

export const getProducts =
  (page, limit = 10, cb = () => null) =>
  async (dispatch) => {
    dispatch(getProductsRequest());
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/products/getProducts?page=${page}&limit=${limit}`
      );

      dispatch(getProductsSuccess());
      cb(data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? err.message);
      dispatch(getProductsFailure());
    }
  };

export const searchProducts =
  (query = "", page, limit = 10, cb = () => null) =>
  async (dispatch) => {
    dispatch(searchProductsRequest());
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/products/search?page=${page}&limit=${limit}&query=${query}`
      );

      dispatch(searchProductsSuccess());
      cb(data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? err.message);
      dispatch(searchProductsFailure());
    }
  };
