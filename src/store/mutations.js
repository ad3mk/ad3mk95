export default {
  mutateLogin: (state, payload) => {
    state.isLoggedIn = true;
    state.loggedUserEmail = payload.email;
    state.loggedUserName = payload.name;
    state.loggedUserRole = payload.role;
  },

  mutateLogout: state => {
    state.isLoggedIn = false;
    state.loggedUserEmail = "";
    state.loggedUserName = "";
    state.loggedUserRole = "";
  },

  mutateRegister: (state, payload) => {
    state.users.push(payload);
  },

  mutateAddActivity: (state, payload) => {
    state.activities.push(payload);
  },

  mutateEditActivity: (state, payload) => {
    let activityIndex = state.activities.findIndex(item => {
      return item.id === payload.id;
    });
    state.activities[activityIndex] = payload;
  },

  mutateDeleteActivity: (state, payload) => {
    let activityIndex = state.activities.findIndex(item => {
      return item.id === payload;
    });
    state.activities.splice(activityIndex, 1);
  }
};
