<template>
  <div class="page-container login">
    <br />
    <b-container>
      <div class="card-container">
        <b-card header="User Login">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ref="email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
                ref="password"
              ></b-form-input>
            </b-form-group>

            <br />
            <b-button type="submit" variant="primary" class="mr-3">Login</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
      </div>
    </b-container>

    <b-alert
      show
      v-if="errorMessage"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
    >
      <p class="text-center mrb-0">{{ errorMessage }}</p>
    </b-alert>
    <b-alert
      show
      v-if="successMessage"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="success"
    >
      <p class="text-center mrb-0">{{ successMessage }}</p>
    </b-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,
      errorMessage: "",
      successMessage: ""
    };
  },
  computed: {
    // get data from store
    ...mapGetters({
      users: "getUsers",
      isLoggedIn: "getIsLoggedIn"
    })
  },

  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    // map store actions
    ...mapActions({
      login: "login"
    }),

    onSubmit(evt) {
      this.errorMessage = "";
      evt.preventDefault();

      let existIndex = this.users.findIndex(user => {
        return user.email === this.form.email;
      });

      // Email not registered
      if (existIndex === -1) {
        this.errorMessage = "Email not registered!";
        this.$refs.email.focus();
        return;
      }

      // Password doesn't match
      if (this.users[existIndex].password !== this.form.password) {
        this.errorMessage = "Wrong password!";
        this.$refs.password.focus();
        return;
      }

      this.login(this.users[existIndex]);

      this.successMessage = "Logged in successfully!";
      this.$router.push("/dashboard");
      // this.onReset();
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }

      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.role = "Student";
      this.form.password = "";
      this.form.cPassword = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },

  watch: {
    errorMessage: function(newVal) {
      // Automatically hide message after two seconds
      if (newVal) {
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      }
    },

    successMessage: function(newVal) {
      // Automatically hide message after two seconds
      if (newVal) {
        setTimeout(() => {
          this.successMessage = "";
        }, 2000);
      }
    }
  }
};
</script>
