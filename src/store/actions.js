export default {
  login: ({ commit }, payload) => {
    commit("mutateLogin", payload);
  },

  logout: ({ commit }, payload) => {
    commit("mutateLogout", payload);
  },

  register: ({ commit }, payload) => {
    commit("mutateRegister", payload);
  },

  addActivity: ({ commit }, payload) => {
    commit("mutateAddActivity", payload);
  },
  editActivity: ({ commit }, payload) => {
    commit("mutateEditActivity", payload);
  },

  deleteActivity: ({ commit }, payload) => {
    commit("mutateDeleteActivity", payload);
  }
};
