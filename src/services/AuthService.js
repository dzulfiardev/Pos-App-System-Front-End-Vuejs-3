import axios from "axios";
import store from "../store";

export const authClient = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 419) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error.response);
  }
);

export default {
  async login(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    await authClient.post("/login", payload);
  },
  async registerUser(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/register", payload);
  },
  async logout() {
    await authClient.post("/logout");
  },
  getAuthUser() {
    return authClient.get("/api/users/auth");
  },
  sendVerification(payload) {
    return authClient.post("/email/verification-notification", payload);
  },
  async forgotPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/forgot-password", payload);
  },
  async resetPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/reset-password", payload);
  },
  updateUser(payload) {
    return authClient.put("/user/profile-information", payload);
  },
};
