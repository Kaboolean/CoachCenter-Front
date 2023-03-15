<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <q-form @submit.prevent="createUser" class="q-gutter-md">
        <div class="row items-center">
          <div class="text-h5 q-mr-md">Create an user</div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Username :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="userName"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 6 && val.length < 25) ||
                      'Enter a correct Username',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-small"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Email :</div>
              <div class="col">
                <q-input
                  filled
                  type="email"
                  v-model="email"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.includes('@')) || 'Enter an email',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Password :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="password"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Please enter a password',
                    (val) =>
                      val.length >= 6 ||
                      'Please enter a password size between 6 and 15 characters',
                    (val) =>
                      regex.test(val) ||
                      'Password must contain at least a digit',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-small"
                />
              </div>
            </div>
          </div>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-select
                v-model="userType"
                :options="userTypeArray"
                label="Standard"
              />
            </div>
          </div>
        </div>

        <q-btn type="submitForm">Create</q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import api from 'src/api';
import { ref, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserType } from 'src/api/models/users';
import { useQuasar } from 'quasar';

const userName = ref('');
const email = ref('');
const password = ref('');
const regex = /\d/;
const userType = ref<UserType>(UserType.client);
const userTypeArray = ['coach', 'client'];

const emit = defineEmits(['update']);
const router = useRouter();
const $q = useQuasar();
async function createUser() {
  try {
    const userId = await api.users.register({
      userName: userName.value,
      email: email.value,
      password: password.value,
      userType: userType.value,
    });
    emit('update');
    router.push(`/users/${userId}`);
    $q.notify({
      message: 'User created.',
      color: 'primary',
    });
  } catch (err) {
    console.log(err);
  }
}
const route = useRoute();
</script>
