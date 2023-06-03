import axios from "axios";

import {
  LOGOUT,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../constants";

const signinRequest = () => ({
  type: SIGNIN_REQUEST,
});

const signinSuccess = (user) => ({
  type: SIGNIN_SUCCESS,
  payload: user,
});

const signinFailure = (error) => ({
  type: SIGNIN_FAILURE,
  payload: error,
});

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const signin = (credentials) => {
  return (dispatch) => {
    dispatch(signinRequest());
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/auth/signin", credentials)
      .then((response) => {
        const user = response.data;
        dispatch(signinSuccess(user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(signinFailure(error.response.data.message ?? error.message));
      });
  };
};

export const signup = (userData) => {
  return (dispatch) => {
    dispatch(signupRequest());

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/auth/signup", userData)
      .then((response) => {
        const user = response.data;
        dispatch(signupSuccess(user));
      })
      .catch((error) => {
        dispatch(signupFailure(error.response.data.message ?? error.message));
      });
  };
};
