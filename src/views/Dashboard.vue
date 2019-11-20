<template>
	<div class="page-container">
		<b-container>
			<br />
			<p>Logged in as {{ loggedUserName }} ({{ loggedUserEmail }}) - {{ loggedUserRole }}</p>
			<hr />

			<SPDashboard v-if="loggedUserRole === 'Service Provider'"></SPDashboard>
		</b-container>
	</div>
</template>

<script>
import { /*mapActions, */ mapGetters } from "vuex";
import SPDashboard from "./serviceproviders/SPDashboard";

export default {
	data() {
		return {};
	},
	mounted() {
		if (!this.isLoggedIn) {
			this.$router.push("/login");
		}
	},
	computed: {
		...mapGetters({
			isLoggedIn: "getIsLoggedIn",
			loggedUserName: "getLoggedUserName",
			loggedUserEmail: "getLoggedUserEmail",
			loggedUserRole: "getLoggedUserRole"
		})
	},

	components: {
		SPDashboard
	}
};
</script>