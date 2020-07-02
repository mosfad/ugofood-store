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
  FETCH_PRODUCT_BEING_REVIEWED,
  UPDATE_CART_ITEM_QTY,
  RESET_CART_QTY_STATUS,
  FETCH_CURRENT_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_CURRENT_ORDER,
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
  getCurrentOrder,
  addNewOrder,
  updateOrder,
  deleteCurrentOrder,
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

  //history.push("/");
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

export const addProductReview = (userId, productId, formValues) => async (
  dispatch
) => {
  // post product review to the user's db
  const response = await reviewProduct(userId, productId, formValues);
  dispatch({ type: ADD_PRODUCT_REVIEW, payload: response.data });
};

export const fetchProductReviewed = (productDetails) => {
  return { type: FETCH_PRODUCT_BEING_REVIEWED, payload: productDetails };
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
  // remove product from cart(in db) from the shoppingcart page
  console.log(itemId);
  const response = await decrementCart(userId, itemId);
  dispatch({ type: REMOVE_FROM_CART, payload: response.data });
};

export const fetchOrder = (userId) => async (dispatch) => {
  // get customer's orders
  const response = await getCurrentOrder(userId);
  dispatch({ type: FETCH_CURRENT_ORDER, payload: response.data });
};

export const updateOrderStatus = (userId, orderData) => async (dispatch) => {
  // update completed order
  const response = await updateOrder(userId, orderData);
  dispatch({ type: UPDATE_ORDER, payload: response.data });
};

export const addOrder = (userId, orderData) => async (dispatch) => {
  // add a new order
  const response = await addNewOrder(userId, orderData);
  dispatch({ type: ADD_ORDER, payload: response.data });
};

export const deleteOrder = (userId, orderId) => async (dispatch) => {
  // delete current order
  const response = await deleteCurrentOrder(userId, orderId);
  dispatch({ type: DELETE_CURRENT_ORDER, payload: response.data });
};
// export const getProductReviews = () => {
//   //get product reviews from user's db
// };
