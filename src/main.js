import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import MyNavbar from "./components/MyNavbar";
import MyModal from "./components/MyModal";
import MyRating from "./components/MyRating";
import router from "./router";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/style.css";

Vue.use(BootstrapVue);
Vue.component("my-navbar", MyNavbar);
Vue.component("my-modal", MyModal);
Vue.component("my-rating", MyRating);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
