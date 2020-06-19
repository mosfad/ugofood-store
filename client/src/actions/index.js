import {
  SIGN_OUT,
  SIGN_UP,
  SIGN_IN,
  AUTO_SIGN_IN,
  OPEN_MODAL,
  CLOSE_MODAL,
  FETCH_USER,
  UNFETCH_USER,
  FETCH_PRODUCTS,
  ADD_PRODUCT_REVIEW,
} from "./types";
import history from "../utils/history";
import {
  logIn,
  register,
  getAuthUser,
  logOut,
  getProducts,
  reviewProduct,
} from "../utils/API";

// export const signIn = (formValues = {}, token = "") => {
//   if (token !== "") {
//     return { type: SIGN_IN, payload: { success: true, token: token } };
//   } else {
//     return async (dispatch) => {
//       const response = await logIn(formValues);

//       dispatch({ type: SIGN_IN, payload: response.data });
//     };
//   }

//   //history.push("/");
// };

export const signIn = (formValues) => async (dispatch) => {
  const response = await logIn(formValues);

  dispatch({ type: SIGN_IN, payload: response.data });

  history.push("/");
};

export const autoSignIn = (token) => {
  return { type: AUTO_SIGN_IN, payload: token };
};

export const signOut = () => async (dispatch) => {
  await logOut();

  dispatch({ type: SIGN_OUT });
  //Remove token from localStorage to avoid user fetching.
  localStorage.setItem("userToken", "");
  history.push("/");
};

export const signUp = (formValues) => async (dispatch) => {
  const response = await register(formValues);
  dispatch({ type: SIGN_UP, payload: response.data });
  history.push("/");
};

export const fetchUser = (authToken) => async (dispatch) => {
  const response = await getAuthUser(authToken);
  dispatch({ type: FETCH_USER, payload: response.data });
  //history.push("/");
};

export const unfetchUser = () => {
  return { type: UNFETCH_USER };
};
export const openModal = () => {
  return { type: OPEN_MODAL };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const fetchProducts = () => async (dispatch) => {
  const response = await getProducts();
  console.log(response);
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const addProductReview = (id, formValues) => async (dispatch) => {
  //post product review to the user's db
  const response = await reviewProduct(id, formValues);
  dispatch({ type: ADD_PRODUCT_REVIEW, payload: response.data });
};

// export const getProductReviews = () => {
//   //get product reviews from user's db
// };
