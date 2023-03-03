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
        console.log(user);
        await store.dispatch('auth/registerUser', user);
        router.replace('/dashboard');
      } catch (error) {
        console.log(error.response);
        errorMessage.value = error.response.data.message;
        console.log(errorMessage.value);
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
