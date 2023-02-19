<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h2 style="text-align: center">Login</h2>
    <q-form @submit="onSubmit" class="q-gutter-md" autofocus>
      <q-input
        filled
        type="email"
        v-model="userEmailInput"
        label="Email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        v-model="passwordInput"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Choose a password"
        maxlength="12"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please enter a password',
          (val) =>
            val.length >= 6 ||
            'Please enter a password size between 6 and 15 characters',
          (val) => regex.test(val) || 'Password must contain at least a digit',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @mouseover="isPwd = !isPwd"
            @mouseleave="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          class="float-right"
        />
      </div>
    </q-form>
    <h6 v-if="errorMessage" style="color: #d90007">{{ errorMessage }}</h6>
    <div>
      <loading-spinner v-if="isLoading"></loading-spinner>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    //User experience
    const isPwd = ref(true);
    const isLoading = ref(false);
    const errorMessage = ref('');

    //Form control
    const userEmailInput = ref('');
    const passwordInput = ref('');
    const regex = /\d/;
    async function onSubmit() {
      const userLogin = {
        email: userEmailInput.value,
        password: passwordInput.value,
      };
      try {
        await store.dispatch('auth/loginUser', userLogin);
        isLoading.value = true;
        router.replace('/');
      } catch (error) {
        errorMessage.value = error.message;
        isLoading.value = false;
        console.log(error);
        console.log(error.message);
      }
    }
    watch(userEmailInput, function () {
      errorMessage.value = '';
    });
    return {
      userEmailInput,
      passwordInput,
      onSubmit,
      regex,
      isPwd,
      isLoading,
      errorMessage,
    };
  },
};
</script>
