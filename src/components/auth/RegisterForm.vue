<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h2 style="text-align: center">Register</h2>
    <h6
      v-if="errorMessageForm"
      style="color: #d90007; max-width: 222px; font-size: small"
    >
      {{ errorMessageForm }}
    </h6>
    <q-form @submit="onSubmit" class="q-gutter-md" style="padding: none">
      <q-input
        filled
        type="text"
        v-model="userUserNameInput"
        label="Enter an username"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please choose an username',
          (val) =>
            (val.length > 5 && val.length < 16) ||
            'Username must be between 6-15 characters',
        ]"
      />
      <q-input
        filled
        type="email"
        v-model="userEmailInput"
        label="Enter your email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please choose an email']"
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

      <q-input
        :type="isPwd2 ? 'password' : 'text'"
        style="min-width: 200px"
        filled
        v-model="passwordInput2"
        label="Validate your password"
        maxlength="12"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '' && passwordInput2 === passwordInput) ||
            'Please enter the same password',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @mouseover="isPwd2 = !isPwd2"
            @mouseleave="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>

      <div :class="userTypeError">
        You are :
        <q-btn-toggle
          v-model="userType"
          class="my-custom-toggle"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'a Coach', value: 'coach' },
            { label: 'a Client', value: 'client' },
          ]"
        />
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          @click="resetForm"
        />
      </div>
    </q-form>
    <div>
      <loading-spinner v-if="isLoading"></loading-spinner>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: ['errorMessage'],
  emits: ['userSubmitted'],
  setup(props, context) {
    //User experience
    const isPwd = ref(true);
    const isPwd2 = ref(true);
    const isLoading = ref(false);
    const errorMessageForm = ref('');
    function resetForm() {
      userEmailInput.value = '';
      passwordInput.value = '';
      passwordInput2.value = '';
      userType.value = null;
    }

    //Form Control
    const userUserNameInput = ref('');
    const userEmailInput = ref('');
    const passwordInput = ref('');
    const passwordInput2 = ref('');
    const userType = ref();
    const userTypeCheck = ref(true);
    const regex = /\d/;
    const formIsValid = ref(true);
    const userTypeError = computed(function () {
      if (userTypeCheck.value === false) {
        return 'error';
      } else {
        return null;
      }
    });

    function onSubmit() {
      //reset des checks
      //errorMessage.value = null;
      userTypeCheck.value = true;
      formIsValid.value = true;
      isLoading.value = true;

      if (!userType.value) {
        userTypeCheck.value = false;
        formIsValid.value = false;
        isLoading.value = false;
        return;
      }

      if (formIsValid.value === true) {
        submitUser();
      }
    }
    function submitUser() {
      //à emit vers le parent
      const user = {
        userName: userUserNameInput.value,
        userEmail: userEmailInput.value,
        password: passwordInput.value,
        userType: userType.value,
      };
      context.emit('userSubmitted', user);
    }
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
      formIsValid,
      userUserNameInput,
      userEmailInput,
      passwordInput,
      passwordInput2,
      userType,
      isPwd,
      isPwd2,
      regex,
      onSubmit,
      userTypeError,
      resetForm,
      isLoading,
      errorMessageForm,
    };
  },
};
</script>

<style scoped>
.error {
  border: 2px solid black;
  padding: 3px;
  border-color: #d90007;
  border-radius: 5px;
}
</style>
