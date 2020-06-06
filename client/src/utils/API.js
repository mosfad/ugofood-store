import axios from "axios";

export const signIn = (formData) => {
  return axios.post("/api/users/login", formData);
};

export const signUp = (formData) => {
  return axios.post("api/users/register", formData);
};

export const getAuthUser = (authToken) => {
  return axios({
    method: "get",
    url: "api/users/current",
    headers: {
      Authorization: authToken,
    },
  });
};
