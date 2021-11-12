import { ref } from "vue";
const user = ref(null);
export default function useAuthUser() {
  const login = async ({ email, password }) => {};
  const logout = async () => {};
  const register = async ({ username, email, password, meta }) => {};
  const update = async (data) => {};
  const sendPasswordRestEmail = async () => {};
  return {
    user,
    login,
    logout,
    register,
    update,
    sendPasswordRestEmail,
  };
}
