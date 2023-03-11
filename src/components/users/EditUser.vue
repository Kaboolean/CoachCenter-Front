<template>
  <q-card>
    <q-card-section>
      <q-form @submit.prevent="updateUser" class="q-gutter-md">
        <!-- <div class="row items-center">
          <div class="text-h5 q-mr-md">Edit the selected user</div>
          <span>{{ user.id }}</span>
        </div> -->

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Username :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.userName"
                  lazy-rules
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
                  v-model="innerValue.email"
                  lazy-rules
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
              <div class="col-auto">Firstname :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.firstName"
                  lazy-rules
                  hide-bottom-space
                  dense
                  class="qinput-width-small"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Lastname :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.lastName"
                  lazy-rules
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
              <div class="col-auto">Birthdate :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.birthDate"
                  lazy-rules
                  hide-bottom-space
                  dense
                  class="qinput-width-small"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date v-model="innerValue.birthDate"></q-date>
                      </q-popup-proxy>
                    </q-icon> </template
                ></q-input>
              </div>
            </div>
          </div>
        </div>
        <q-btn type="submitForm">Update</q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import api from 'src/api';
import { GetUserModel } from 'src/api/models/users';
import { defineEmits, onMounted, ref } from 'vue';
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
