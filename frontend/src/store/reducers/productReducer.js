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

const initialState = {
  isLoading: false,
  allProducts: [],
  newProducts: [],
  popularProducts: [],
  product: {},
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case GET_ALL_PRODUCTS_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case GET_PRODUCTS_FOR_HOME_PAGE_REQUEST:
    case GET_PRODUCT_BY_ID_REQUEST:
    case GET_PRODUCTS_REQUEST:
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_FAILURE:
    case GET_ALL_PRODUCTS_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case GET_PRODUCTS_FOR_HOME_PAGE_FAILURE:
    case GET_PRODUCT_BY_ID_FAILURE:
    case GET_PRODUCTS_FAILURE:
    case GET_PRODUCTS_SUCCESS:
    case SEARCH_PRODUCT_SUCCESS:
    case SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allProducts: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allProducts: state.allProducts.filter((p) => p._id !== action.payload),
      };

    case GET_PRODUCTS_FOR_HOME_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newProducts: action.payload.newProducts,
        popularProducts: action.payload.popularProducts,
      };

    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };

    default:
      return state;
  }
}
