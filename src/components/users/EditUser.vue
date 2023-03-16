<template>
  <q-card>
    <q-card-section>
      <q-form @submit.prevent="updateUser">
        <!-- <div class="row items-center">
          <div class="text-h5 q-mr-md">Edit the selected user</div>
          <span>{{ user.id }}</span>
        </div> -->

        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-xs-12">
            <user-input
              filled
              type="text"
              label="Username"
              v-model="innerValue.userName"
              lazy-rules
              :rules="[
                () =>
                  (innerValue.userName &&
                    innerValue.userName.length > 5 &&
                    innerValue.userName.length < 25) ||
                  'Enter a correct Username',
              ]"
              hide-bottom-space
              dense
              class="qinput-width-small q-mb-sm"
            />
          </div>
          <div class="col-md-6 col-xs-12">
            <user-input
              filled
              label="Email"
              type="email"
              v-model="innerValue.email"
              lazy-rules
              :rules="[
                () =>
                  (innerValue.email && innerValue.email.includes('@')) ||
                  'Enter an email',
              ]"
              hide-bottom-space
              dense
              class="qinput-width-medium q-mb-sm"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-xs-12">
            <user-input
              filled
              label="Firstname"
              type="text"
              v-model="innerValue.firstName"
              lazy-rules
              :rules="[
                () =>
                  (innerValue.firstName &&
                    innerValue.firstName.length > 3 &&
                    innerValue.firstName.length < 15) ||
                  'Enter a correct firstname',
              ]"
              hide-bottom-space
              dense
              class="qinput-width-small q-mb-sm"
            />
          </div>
          <div class="col-md-6 col-xs-12">
            <user-input
              filled
              label="Lastname"
              type="text"
              v-model="innerValue.lastName"
              lazy-rules
              :rules="[
                () =>
                  (innerValue.lastName &&
                    innerValue.lastName.length > 3 &&
                    innerValue.lastName.length < 15) ||
                  'Enter a correct lastname',
              ]"
              hide-bottom-space
              dense
              class="qinput-width-medium q-mb-sm"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <div class="row items-center">
              <div class="col">
                <user-date
                  v-model="innerValue.birthDate"
                  label="Birthdate"
                ></user-date>
              </div>
            </div>
          </div>
        </div>
        <q-btn type="submitForm" class="q-mt-md">Update</q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import api from 'src/api';
import { GetUserModel } from 'src/api/models/users';
import { defineEmits, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
const innerValue = ref<GetUserModel>({
  id: '',
  userName: '',
  email: '',
  lastLoginDate: '',
  firstName: '',
  lastName: '',
  birthDate: '',
  userType: '',
});
const props = defineProps<{
  user: GetUserModel;
}>();
onMounted(() => {
  innerValue.value.id = props.user.id;
  innerValue.value.userName = props.user.userName;
  innerValue.value.email = props.user.email;
  innerValue.value.lastLoginDate = props.user.lastLoginDate;
  innerValue.value.firstName = props.user.firstName;
  innerValue.value.lastName = props.user.lastName;
  innerValue.value.birthDate = props.user.birthDate;
  innerValue.value.userType = props.user.userType;
});

const emit = defineEmits(['updateUser']);
const $q = useQuasar();
async function updateUser() {
  await api.users.updateUser({
    id: innerValue.value.id,
    userName: innerValue.value.userName,
    email: innerValue.value.email,
    lastLoginDate: innerValue.value.lastLoginDate,
    firstName: innerValue.value.firstName,
    lastName: innerValue.value.lastName,
    birthDate: innerValue.value.birthDate,
    userType: innerValue.value.userType,
  });
  emit('updateUser');
  $q.notify({
    message: 'User updated.',
    color: 'primary',
  });
}
</script>

<style>
.qinput-width-small {
  max-width: 200px;
}
.qinput-width-medium {
  max-width: 300px;
}
</style>
