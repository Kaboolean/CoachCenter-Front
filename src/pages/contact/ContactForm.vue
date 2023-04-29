<template>
  <div v-if="(user.userId && !userModel?.firstName) || !userModel?.lastName">
    <h5>Error : fill your account information first please</h5>
  </div>

  <div v-else-if="!submitted" class="row items-center justify-center">
    <div class="q-pa-md">
      <h5 style="text-align: center">Contact form</h5>
      <q-form @submit="submitForm" class="q-ma-sm" style="min-width: 400px">
        <q-input
          v-if="!user.userId"
          outlined
          type="email"
          v-model="emailInput"
          label="Enter your email"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0 && val.includes('@')) ||
              'Please choose an email',
          ]"
        />
        <q-input
          v-if="!user.userId"
          outlined
          label="Firstname"
          type="text"
          v-model="firstNameInput"
          lazy-rules
          :rules="[
                () => {

                    return !! firstNameInput ||
                  'Enter your firstname.'

                },
                () =>{
                  return (
                    firstNameInput!.length >= 3 &&
                    firstNameInput!.length <= 25) ||
                  'Firstname must be 3-25 characters long.'},
              ]"
        />

        <q-input
          v-if="!user.userId"
          outlined
          label="Lastname"
          type="text"
          v-model="lastNameInput"
          lazy-rules
          :rules="[
                () => {
                    return !! lastNameInput ||
                  'Enter your lastname.'
                },
                () =>{
                  return (
                    lastNameInput!.length >= 3 &&
                    lastNameInput!.length <= 25) ||
                  'Lastname must be 3-25 characters long.'},
              ]"
        />
        <q-input
          outlined
          type="textarea"
          v-model="textInput"
          label="Your message"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Enter a message',
            (val) => val.length > 25 || 'Your message is too short',
            (val) =>
              val.length < 1000 || 'Your message exceeds 1000 characters',
          ]"
          hide-bottom-space
        />
        <q-btn label="Submit" type="submit" color="primary" />
      </q-form>
    </div>
  </div>
  <div v-if="submitted">
    <h5>Request submitted : we will answer as soon as possible</h5>
  </div>
</template>

<script setup lang="ts">
import api from 'src/api';
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import { GetUserModel } from 'src/api/models/users';
import { GuestContactForm, UserContactForm } from 'src/api/models/contactForms';

const store = useStore();
const user = ref(store.getters['auth/getUser']);
const userModel = ref<GetUserModel>();

onBeforeMount(async () => {
  if (user.value.userId) {
    userModel.value = await api.users.getUserById(user.value.userId);
  } else {
    return;
  }
});

const textInput = ref();
const emailInput = ref();
const firstNameInput = ref();
const lastNameInput = ref();

const submitted = ref<boolean>(false);

async function submitForm() {
  if (!user.value.userId) {
    const GuestContactForm = ref<GuestContactForm>({
      FirstName: firstNameInput.value,
      LastName: lastNameInput.value,
      Email: emailInput.value,
      TextRequest: textInput.value,
    });
    await api.contactForms.CreateGuestContactForm(GuestContactForm.value);
    submitted.value = true;
  } else {
    const UserContactForm = ref<UserContactForm>({
      TextRequest: textInput.value,
    });
    await api.contactForms.CreateUserContactForm(UserContactForm.value);
    submitted.value = true;
  }
}
</script>
