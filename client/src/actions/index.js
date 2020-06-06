import { SIGN_OUT, SIGN_UP, SIGN_IN } from "./types";
import history from "../history";
import API from "../utils/API";

export const signIn = (formValues) => async (dispatch) => {
  const response = await API.signIn(formValues);
  dispatch({ type: SIGN_IN, payload: response.data });
  history.push("/");
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signUp = (formValues) => async (dispatch) => {
  const response = await API.signUp(formValues);
  dispatch({ type: SIGN_UP, payload: response.data });
  history.push("/");
};
