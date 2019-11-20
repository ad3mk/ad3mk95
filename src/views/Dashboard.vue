<template>
	<div class="page-container">
		<b-container>
			<br />
			<p>Logged in as {{ loggedUserName }} ({{ loggedUserEmail }}) - {{ loggedUserRole }}</p>
			<hr />

			<SPDashboard v-if="loggedUserRole === 'Service Provider'"></SPDashboard>
			<STDashboard v-else></STDashboard>
		</b-container>
	</div>
</template>

<script>
import { /*mapActions, */ mapGetters } from "vuex";
import SPDashboard from "./dashboard/SPDashboard";
import STDashboard from "./dashboard/STDashboard";

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
		SPDashboard,
		STDashboard
	}
};
</script>