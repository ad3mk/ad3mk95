import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		isLoggedIn: false,
		loggedUserEmail: "",
		loggedUserName: "",
		loggedUserRole: "",
		users: [],
		classes: []
	},
	getters,
	mutations,
	actions,
	plugins: [createPersistedState()]
});
