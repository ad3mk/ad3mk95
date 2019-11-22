<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">ad3mk95</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <template v-if="!isLoggedIn">
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item to="/register">Register</b-nav-item>
          </template>

          <template v-else>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ loggedUserName }}</em>
              </template>
              <b-dropdown-item hre="#" @click="goToDashboard"
                >Dashboard</b-dropdown-item
              >
              <b-dropdown-item href="#" @click="logoutNow"
                >Log Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    // get store data
    ...mapGetters({
      isLoggedIn: "getIsLoggedIn",
      loggedUserName: "getLoggedUserName"
    })
  },
  methods: {
    // map store action/methods
    ...mapActions({
      logout: "logout"
    }),

    goToDashboard() {
      if (this.$route.name !== "dashboard") {
        this.$router.push("/dashboard");
      }
    },

    logoutNow() {
      this.logout();
      this.$router.push("/login");
    }
  }
};
</script>
