import store from "../store/index";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import guest from "../middleware/guest";
import verify from "../middleware/verify";
import notVerify from "../middleware/notVerify";
import middlewarePipeline from "./middlewarePipeline";

import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/Web/NotFound.vue";
import Home from "../views/Home.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import ForgotPassword from "../views/Auth/ForgotPassword.vue";
import ResetPassword from "../views/Auth/ResetPassword.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import UserManagement from "../views/Dashboard/UserManagement.vue";
import Users from "../views/Dashboard/Users.vue";
import VerifyEmail from "../views/Auth/VerifyEmail.vue";
import Profile from "../views/Dashboard/Profile.vue";
import Products from "../views/Dashboard/Products.vue";

// import Sidebar
import DashboardV2 from "../views/Dashboard/Layout/DashboardV2.vue";
import DashboardV3 from "../views/Dashboard/Layout/DashboardLayout.vue";
import SidebarTest from "../views/Dashboard/Partials/SidebarV01.vue";
import Transactions from "../views/Dashboard/Transactions.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { middleware: [guest] },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { middleware: [guest] },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { middleware: [guest] },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { middleware: [guest] },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { middleware: [guest] },
  },
  {
    path: "/about",
    name: "About",
    meta: { middleware: [guest] },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth, verify],
    },
  },
  {
    path: "/dashboard-v2",
    name: "dasboard-v2",
    component: DashboardV2,
    meta: { middleware: [guest] },
  },
  {
    path: "/dashboard-v3",
    name: "dasboard-v3",
    component: DashboardV3,
    meta: { middleware: [guest] },
  },
  {
    path: "/test-path",
    name: "sidebar-v1",
    component: SidebarTest,
    meta: { middleware: [guest] },
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: { middleware: [auth, verify] },
  },
  {
    path: "/setting/user-management",
    name: "UserManagement",
    component: UserManagement,
    meta: { middleware: [auth, verify] },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { middleware: [auth, verify] },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: { middleware: [auth, verify] },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { middleware: [auth, admin] },
  },
  {
    path: "/verify-email",
    name: "VerirfyEmail",
    component: VerifyEmail,
    meta: { middleware: [auth, notVerify] },
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  if (!middleware) {
    document.title = to.name;
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
