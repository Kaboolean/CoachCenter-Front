<template>
  <div>
    <q-page class="flex flex-center fixed-center">
      <register-form
        @userSubmitted="submitData"
        :errorMessage="errorMessage"
      ></register-form>
    </q-page>
  </div>
</template>

<script>
import RegisterForm from '../../components/auth/RegisterForm.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
export default {
  components: { RegisterForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const errorMessage = ref('');

    async function submitData(user) {
      try {
        await store.dispatch('auth/registerUser', user);
        router.replace('/dashboard');
      } catch (error) {
        errorMessage.value = error.response.data.message;
      }
    }
    return {
      store,
      submitData,
      errorMessage,
    };
  },
};
</script>
