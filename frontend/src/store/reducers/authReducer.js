import { toast } from "react-toastify";
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from "../constants";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      toast.success("Logged in!");
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case SIGNIN_FAILURE:
    case SIGNUP_FAILURE:
      toast.error(action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT:
      toast.success("Logged out!");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
