import { SIGN_OUT, SIGN_UP, SIGN_IN, OPEN_MODAL, CLOSE_MODAL } from "./types";
import history from "../history";
import { logIn, register, getAuthUser } from "../utils/API";

export const signIn = (formValues) => async (dispatch) => {
  const response = await logIn(formValues);

  dispatch({ type: SIGN_IN, payload: response.data });
  //history.push("/");
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signUp = (formValues) => async (dispatch) => {
  const response = await register(formValues);
  dispatch({ type: SIGN_UP, payload: response.data });
  history.push("/");
};

export const fetchUser = (authToken) => async (dispatch) => {
  const response = await getAuthUser(authToken);
  dispatch({ type: SIGN_IN, payload: response.data });
  history.push("/");
};

export const openModal = () => {
  return { type: OPEN_MODAL };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};