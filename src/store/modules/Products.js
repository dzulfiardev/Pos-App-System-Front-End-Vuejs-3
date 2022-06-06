export const namespaced = true;

export const state = {
  file: "",
};
export const actions = {
  bindFile({ commit }, file) {
    commit("storeFile", file);
  },
};
export const mutations = {
  storeFile(state, data) {
    state.file = data;
  },
};
export const getters = {
  getFile(state) {
    return state.file;
  },
};
