<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async (provider) => {
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "Me" });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <div class="max-w-lg m-auto">
    <form @submit.prevent="handleLogin()">
      <h1 class="text-3xl mb-5">Login</h1>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Login</button>
      <router-link to="/forgotPassword" class="mt-3 block text-right">
        Forgot Password?
      </router-link>
    </form>
    <hr class="my-5" />
    <div class="text-center">
      <p>Or Login With Social Provider</p>
      <p class="text-gray-500">
        <a @click.prevent="withSocial('github')">Github</a> |
        <a @click.prevent="withSocial('facebook')">Facebook</a> |
        <a @click.prevent="withSocial('google')">Google</a>
      </p>
    </div>
  </div>
</template>
