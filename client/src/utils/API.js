import axios from "axios";

export const logIn = (formData) => {
  return axios.post("/api/users/login", formData);
};

export const register = (formData) => {
  return axios.post("/api/users/register", formData);
};

export const getAuthUser = (authToken) => {
  return axios({
    method: "get",
    url: "/api/users/current",
    headers: {
      Authorization: authToken,
    },
  });
};

export const getProducts = () => {
  return axios.get("/api/products");
};

export const reviewProduct = (productId, formData) => {
  return axios.post(`/api/products/${productId}`, formData);
};

export const getCartItems = (userId) => {
  return axios.get(`/api/users/cart/${userId}`);
};

export const incrementCart = (userId, formData) => {
  return axios.post(`/api/users/cart/${userId}`, formData);
};

export const decrementCart = (userId, itemId) => {
  return axios.delete(`/api/users/cart/${userId}/${itemId}`);
};

export const updateCartItem = (userId, cartData) => {
  return axios.post(`/api/users/cart/update/${userId}`, cartData);
};

export const getOrders = (userId) => {
  return axios.get(`/api/users/order/${userId}`);
};

export const addNewOrder = (userId) => {
  return axios.post(`/api/users/order/${userId}`);
};

export const updateOrder = (userId) => {
  return axios.post(`/api/users/order/update/${userId}`);
};

export const logOut = () => {
  return axios.get("/api/users/logout");
};
