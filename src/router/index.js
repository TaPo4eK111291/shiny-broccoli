import Vue from "vue";
import VueRouter from "vue-router";
import Spiral from "../modules/Spiral";
import TypoHelper from "../modules/TypoHelper";
import Interpreter from "../modules/Interpreter";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Spiral",
    component: Spiral,
    alias: "/Spiral",
  },
  {
    path: "/TypoHelper",
    name: "TypoHelper",
    component: TypoHelper,
  },
  {
    path: "/Interpreter",
    name: "Interpreter",
    component: Interpreter,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
