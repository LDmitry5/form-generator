import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import DemoForm1 from "@/pages/DemoForm1.vue";
import DemoForm2 from "@/pages/DemoForm2.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/form1", component: DemoForm1 },
  { path: "/form2", component: DemoForm2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
