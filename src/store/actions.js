export default {
	setLoginStatus: ({ commit }, payload) => {
		commit("mutateLoginStatus", payload);
	},

	register: ({ commit }, payload) => {
		commit("mutateRegister", payload);
	}
};
