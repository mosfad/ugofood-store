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

export const logOut = () => {
  return axios.get("/api/users/logout");
};
