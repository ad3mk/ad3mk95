export default {
	login: ({ commit }, payload) => {
		commit("mutateLogin", payload);
	},

	register: ({ commit }, payload) => {
		commit("mutateRegister", payload);
	},

	logout: ({ commit }, payload) => {
		commit("mutateLogout", payload);
	}
};
