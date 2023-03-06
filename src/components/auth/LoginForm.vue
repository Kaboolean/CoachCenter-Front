<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h2 style="text-align: center">Login</h2>
    <q-form @submit="onSubmit" class="q-gutter-md" autofocus>
      <q-input
        filled
        type="text"
        v-model="userNameInput"
        label="Username"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please enter your username',
        ]"
      />

      <q-input
        v-model="passwordInput"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Choose a password"
        maxlength="12"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please enter your password',
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
    <h6 v-if="errorMessageForm" style="color: #d90007">
      {{ errorMessageForm }}
    </h6>
    <div>
      <loading-spinner v-if="isLoading"></loading-spinner>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: ['errorMessage'],
  emits: ['loginSubmitted'],
  setup(props, context) {
    //User experience
    const isPwd = ref(true);
    const isLoading = ref(false);
    const errorMessageForm = ref('');

    //Form control
    const userNameInput = ref('');
    const passwordInput = ref('');
    const regex = /\d/;
    async function onSubmit() {
      context.emit('loginSubmitted', {
        UserName: userNameInput.value,
        Password: passwordInput.value,
      });
    }
    watch(userNameInput, function () {
      errorMessageForm.value = '';
    });
    watch(
      () => props.errorMessage,
      function (newVal) {
        errorMessageForm.value = newVal;
        if (newVal) {
          isLoading.value = false;
        }
      }
    );
    return {
      userNameInput,
      passwordInput,
      onSubmit,
      regex,
      isPwd,
      isLoading,
      errorMessageForm,
    };
  },
};
</script>
