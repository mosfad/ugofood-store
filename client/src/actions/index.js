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
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_PRODUCT_REVIEW,
  UPDATE_CART_ITEM_QTY,
  RESET_CART_QTY_STATUS,
} from "./types";
import history from "../utils/history";
import {
  logIn,
  register,
  getAuthUser,
  logOut,
  getProducts,
  reviewProduct,
  getCartItems,
  incrementCart,
  decrementCart,
  updateCartItem,
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
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const addProductReview = (productId, formValues) => async (dispatch) => {
  // post product review to the user's db
  const response = await reviewProduct(productId, formValues);
  dispatch({ type: ADD_PRODUCT_REVIEW, payload: response.data });
};

export const fetchCart = (userId) => async (dispatch) => {
  // display the items in the cart from db.
  const response = await getCartItems(userId);
  dispatch({ type: FETCH_CART, payload: response.data });
};

export const addToCart = (userId, formValues) => async (dispatch) => {
  // add product to cart(in db) from the homepage
  const response = await incrementCart(userId, formValues);
  dispatch({ type: ADD_TO_CART, payload: response.data });
};

export const updateCartQty = (userId, formValues) => async (dispatch) => {
  // update cart item quantity in db from shopppingcart page.
  const response = await updateCartItem(userId, formValues);
  dispatch({ type: UPDATE_CART_ITEM_QTY, payload: response.data });
};

export const resetCartQtyStatus = () => {
  return { type: RESET_CART_QTY_STATUS };
};
export const removeFromCart = (userId, itemId) => async (dispatch) => {
  //remove product from cart(in db) from the shoppingcart page
  console.log(itemId);
  const response = await decrementCart(userId, itemId);
  dispatch({ type: REMOVE_FROM_CART, payload: response.data });
};
// export const getProductReviews = () => {
//   //get product reviews from user's db
// };
