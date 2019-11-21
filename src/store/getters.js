/* eslint-disable prettier/prettier */
export default {
  getIsLoggedIn: state => {
    return state.isLoggedIn;
  },

  getLoggedUserEmail: state => {
    return state.loggedUserEmail;
  },

  getLoggedUserName: state => {
    return state.loggedUserName;
  },

  getLoggedUserRole: state => {
    return state.loggedUserRole;
  },

  getUsers: state => {
    return state.users;
  },

  getActivities: state => {
    return state.activities;
  }
};
