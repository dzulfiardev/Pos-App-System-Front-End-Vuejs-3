import router from "../../router";
import AuthService from "../../services/AuthService";
import { getError } from "../../utils/helpers";

export const namespaced = true;

export const state = {
  user: null,
  loading: false,
  error: null,
  verifyUser: null,
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_VERIFY_USER(state, verifyUser) {
    state.verifyUser = verifyUser;
  },
};

export const actions = {
  logout({ commit, dispatch }) {
    return AuthService.logout()
      .then(() => {
        commit("SET_USER", null);
        dispatch("setGuest", { value: "isGuest" });
        if (router.currentRoute.name !== "Login") {
          router.push({ path: "/login" });
        }
      })
      .catch((err) => {
        commit("SET_ERROR", getError(err));
      });
  },
  async getAuthUser({ commit }) {
    commit("SET_LOADING", true);

    try {
      const response = await AuthService.getAuthUser();
      commit("SET_USER", response.data.data);
      commit("SET_VERIFY_USER", response.data.data.emailVerified);
      commit("SET_LOADING", false);
      return response.data.data;
    } catch (err) {
      commit("SET_LOADING", false);
      commit("SET_USER", null);
      commit("SET_ERROR", getError(err));
    }
  },
  setGuest(context, { value }) {
    window.localStorage.setItem("guest", value);
  },
};

export const getters = {
  authUser: (state) => {
    return state.user;
  },
  isAdmin: (state) => {
    return state.user ? state.user.isAdmin : false;
  },
  avatar: (state) => {
    let avatar = "";
    if (state.user.avatar) {
      avatar = state.user.avatar;
      return avatar;
    } else {
      let name = state.user.name.split(" ", 2);
      avatar = "https://ui-avatars.com/api/?name=" + name[0] + "+" + name[1];
      return avatar;
    }
  },
  verifyUser: (state) => {
    return state.verifyUser;
  },
  error: (state) => {
    return state.error;
  },
  loading: (state) => {
    return state.loading;
  },
  loggedIn: (state) => {
    return !!state.user;
  },
  guest: () => {
    const storageItem = window.localStorage.getItem("guest");
    if (!storageItem) return false;
    if (storageItem === "isGuest") return true;
    if (storageItem === "isNotGuest") return false;
  },
};
