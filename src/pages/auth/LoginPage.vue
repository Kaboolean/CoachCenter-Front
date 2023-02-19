<template>
  <div>
    <q-page class="flex flex-center">
      <login-form></login-form>
    </q-page>
  </div>
</template>

<script>
import LoginForm from '../../components/auth/LoginForm.vue';
import Store from '../../store/index.js';
export default {
  components: { LoginForm },
  setup() {
    const store = Store;

    return {};
  },
};
</script>
