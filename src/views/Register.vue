<template>
  <div class="page-container login">
    <br />
    <b-container>
      <div class="card-container">
        <b-card header="New User Registration">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ref="email"
                class="form-control"
              />
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Your Name:"
              label-for="input-2"
            >
              <input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter name"
                class="form-control"
              />
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Register As:"
              label-for="input-3"
            >
              <div class="ml-5">
                <b-form-radio
                  v-model="form.role"
                  name="some-radios"
                  value="Student"
                  >Student</b-form-radio
                >
                <b-form-radio
                  v-model="form.role"
                  name="some-radios"
                  value="Parent"
                  >Parent</b-form-radio
                >
                <b-form-radio
                  v-model="form.role"
                  name="some-radios"
                  value="Service Provider"
                  >Service Provider</b-form-radio
                >
              </div>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Password:"
              label-for="input-4"
            >
              <input
                id="input-4"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
                class="form-control"
              />
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Confirm Password:"
              label-for="input-5"
            >
              <input
                id="input-5"
                v-model="form.cPassword"
                type="password"
                required
                placeholder="Enter password again"
                ref="cPassword"
                class="form-control"
              />
            </b-form-group>

            <br />
            <b-button type="submit" variant="primary" class="mr-3"
              >Register</b-button
            >
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
        name: "",
        role: "Student",
        password: "",
        cPassword: ""
      },
      show: true,
      errorMessage: "",
      successMessage: ""
    };
  },
  computed: {
    // get store data
    ...mapGetters({
      users: "getUsers",
      isLoggedIn: "getIsLoggedIn"
    })
  },
  mounted() {
    // Login Check
    if (this.isLoggedIn) {
      this.$router.push("/dashboard");
    }
  },

  methods: {
    ...mapActions({
      register: "register"
    }),
    onSubmit(evt) {
      this.errorMessage = "";
      evt.preventDefault();

      // Check password and confirm password
      if (this.form.password !== this.form.cPassword) {
        this.errorMessage = "Password and Confirm password don't match";
        this.$refs.cPassword.focus();
        return;
      }

      let existIndex = this.users.findIndex(user => {
        return user.email === this.form.email;
      });

      // Email already registered
      if (existIndex > -1) {
        this.errorMessage = "Email already registered!";
        this.$refs.email.focus();
        return;
      }

      // call/dispatchs store method/action
      this.register({
        email: this.form.email,
        name: this.form.name,
        role: this.form.role,
        password: this.form.password
      });

      this.successMessage = "Registration successfull!";
      this.onReset();
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
