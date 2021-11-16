import useAuthUser from "@/composables/UseAuthUser";
export default function requiresAuthMiddleware(route) {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    route.meta.requiresAuth &&
    !Object.keys(route.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
}
