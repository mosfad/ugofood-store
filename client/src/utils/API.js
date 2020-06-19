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

export const reviewProduct = (id, formData) => {
  return axios.post(`/api/products/${id}`, formData);
};

export const logOut = () => {
  return axios.get("/api/users/logout");
};
