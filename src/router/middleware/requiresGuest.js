import useAuthUser from "@/composables/UseAuthUser";
export default function requiresGuestMiddleware(route) {
  const { isLoggedIn } = useAuthUser();
  if (isLoggedIn() && route.meta.requiresGuest) {
    return { name: "Home" };
  }
}
