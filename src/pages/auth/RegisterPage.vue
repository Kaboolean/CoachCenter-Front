<template>
  <div>
    <q-page class="flex flex-center">
      <register-form @userSubmitted="submitData"></register-form>
    </q-page>
  </div>
</template>

<script>
import RegisterForm from '../../components/auth/RegisterForm.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  components: { RegisterForm },
  setup() {
    const store = useStore();
    const router = useRouter();

    async function submitData(user) {
      try {
        await store.dispatch('auth/registerUser', user);
        router.replace('/login');
      } catch (error) {
        console.log(error.message);
      }
    }
    return {
      store,
      submitData,
    };
  },
};
</script>
