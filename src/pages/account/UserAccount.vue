<template>
  <q-page>
    <div class="row">
      <EditUser
        v-if="userModel"
        :user="userModel"
        @updateUser="update"
      ></EditUser>
    </div>

    <div class="row">
      <q-btn @click="details" class="q-my-md">
        {{ displayDetails ? 'Hide' : 'Show more' }} personnal data</q-btn
      >
    </div>

    <div class="row">
      <EditClient
        v-if="displayDetails && user.userType === 'client'"
        :userId="user.userId!"
        :client="client!"
        @updateClient="update"
      ></EditClient>
      <EditCoach
        v-if="displayDetails && user.userType === 'coach'"
        :userId="user.userId!"
        :coach="coach!"
        @updateCoach="update"
      ></EditCoach>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import api from 'src/api';
import { useStore } from 'vuex';
import { onBeforeMount, ref } from 'vue';
import { GetClientModel } from 'src/api/models/clients';
import { GetCoachModel } from 'src/api/models/coaches';
import { GetUserModel } from 'src/api/models/users';
import EditCoach from 'src/components/users/EditCoach.vue';
import EditClient from 'src/components/users/EditClient.vue';
import EditUser from 'src/components/users/EditUser.vue';
const store = useStore();
const user = ref(store.getters['auth/getUser']);
const displayDetails = ref(false);

const userModel = ref<GetUserModel>();
const client = ref<GetClientModel>();
const coach = ref<GetCoachModel>();

onBeforeMount(async () => {
  userModel.value = await api.users.getUserById(user.value.userId);
  if (user.value.userType === 'client') {
    client.value = await api.users.getClient(user.value.userId);
  } else if (user.value.userType === 'coach') {
    coach.value = await api.users.getCoach(user.value.userId);
  }
});

function details() {
  displayDetails.value = !displayDetails.value;
}

function update() {
  console.log('ok');
}
</script>
