<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const {
  register,
  registerWithSocialProvider: withSocial,
  getSupportedSocialProviders,
} = useAuthUser();

// Form reactive ref to keep up with the form data
const form = ref({
  name: "",
  email: "",
  password: "",
});

// function to hand the form submit
const handleSubmit = async () => {
  try {
    // use the register method from the AuthUser composable
    await register(form.value);

    // and redirect to a EmailConfirmation page that will instruct
    // the user to confirm their email address
    router.push({
      name: "EmailConfirmation",
      query: { email: form.value.email },
    });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <div class="max-w-lg m-auto">
    <form @submit.prevent="handleSubmit">
      <h1 class="text-3xl mb-5">Register</h1>
      <label>Name <input v-model="form.name" type="text" /></label>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Register</button>
    </form>

    <hr class="my-5" />
    <div class="text-center">
      <p>Or Register With Social Provider</p>
      <p class="text-gray-500">
        <a @click.prevent="withSocial('github')">Github</a> |
        <a @click.prevent="withSocial('facebook')">Facebook</a> |
        <a @click.prevent="withSocial('google')">Google</a>
      </p>
    </div>
  </div>
</template>
