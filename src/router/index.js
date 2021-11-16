import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";
import requiresAuthMiddleware from "@/router/middleware/requiresAuth";
import requiresGuestMiddleware from "@/router/middleware/requiresGuest";

const routes = [
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("@/pages/auth/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "Me",
    path: "/me",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/auth/Me.vue"),
  },
  {
    name: "Login",
    path: "/login",
    meta: {
      requiresGuest: true,
    },
    component: () => import("@/pages/auth/Login.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    meta: {
      requiresGuest: true,
    },
    component: () => import("@/pages/auth/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "Register",
    path: "/register",
    meta: {
      requiresGuest: true,
    },
    component: () => import("@/pages/auth/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const middlewares = [
    // register all middlewares here
    requiresAuthMiddleware(to),
    requiresGuestMiddleware(to),
  ].filter((m) => typeof m !== "undefined");
  if (middlewares.length) return middlewares[0];
});

export default router;
