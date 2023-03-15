<template>
  <div class="row items-center justify-center">
    <register-form
      @userSubmitted="submitData"
      :errorMessage="errorMessage"
    ></register-form>
  </div>
</template>

<script>
import RegisterForm from '../../components/auth/RegisterForm.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
export default {
  components: { RegisterForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const errorMessage = ref('');
    const $q = useQuasar();

    async function submitData(user) {
      try {
        await store.dispatch('auth/registerUser', user);
        router.replace('/homepage');
        $q.notify({
          message: 'Registered successfully :)',
          color: 'primary',
        });
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
