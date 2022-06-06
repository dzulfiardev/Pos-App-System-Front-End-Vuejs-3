import axios from "axios";
import store from "../store";

export const apiClient = axios.create({
  // baseURL: process.env.VUE_APP_API_URL + "/api",
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters["auth/authUser"] &&
      !store.getters["auth/guest"]
    ) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);

export default {
  async storeProduct(payload) {
    await apiClient.post("/products", payload);
  },
};
