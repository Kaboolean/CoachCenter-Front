<template>
  <div>
    <q-page class="flex flex-center fixed-center">
      <login-form
        @loginSubmitted="submitLogin"
        :errorMessage="errorMessage"
      ></login-form>
    </q-page>
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
        console.log(error.response);
        errorMessage.value = error.response.data.message;
        console.log(errorMessage.value);
      }
    }
    return { submitLogin, errorMessage };
  },
};
</script>
