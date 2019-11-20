<template>
	<div class="page-container">
		<b-container>
			<br />
			<h2>User Dashboard</h2>
			<p>Logged in as {{ loggedUserName }}({{ loggedUserEmail }}) - {{ loggedUserRole }}</p>
		</b-container>
	</div>
</template>

<script>
import { /*mapActions, */ mapGetters } from "vuex";

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
	}
};
</script>