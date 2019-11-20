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
	}
};
