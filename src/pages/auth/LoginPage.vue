<template>
  <div class="row items-center justify-center">
    <login-form
      @loginSubmitted="submitLogin"
      :errorMessage="errorMessage"
    ></login-form>
  </div>
</template>

<script>
import LoginForm from '../../components/auth/LoginForm.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  components: { LoginForm },
  setup() {
    const errorMessage = ref('');
    const store = useStore();
    const router = useRouter();
    async function submitLogin(LoginModel) {
      try {
        await store.dispatch('auth/login', LoginModel);
        router.replace('/');
      } catch (error) {
        errorMessage.value = error.response.data.message;
      }
    }
    return { submitLogin, errorMessage };
  },
};
</script>
