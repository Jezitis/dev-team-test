import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import('../components/Login.vue'),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import('../components/Registration.vue'),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () =>
      import("../views/Edit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
