export default {
	mutateLoginStatus: (state, payload) => {
		state.isLoggedIn = true;
		state.loggedUserEmail = payload.email;
		state.loggedUserName = payload.name;
		state.loggedUserRole = payload.role;
	},

	mutateRegister: (state, payload) => {
		state.users.push(payload);
	}
};
