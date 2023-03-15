<template>
  <div class="container">
    <EditUser v-if="user" :user="user" @updateUser="update"> </EditUser>

    <q-btn @click="details" class="q-my-md">
      {{ displayDetails ? 'Hide' : 'Show' }} user type details</q-btn
    >

    <EditClient
      v-if="displayDetails && user!.userType === 'client'"
      :userId="props.userId!"
      :client="client!"
      @updateClient="update"
    ></EditClient>
    <EditCoach
      v-if="displayDetails && user!.userType === 'coach'"
      :userId="props.userId!"
      :coach="coach!"
      @updateCoach="update"
    ></EditCoach>
  </div>
</template>

<script setup lang="ts">
import { GetUserModel } from 'src/api/models/users';
import { GetCoachModel } from 'src/api/models/coaches';
import { GetClientModel } from 'src/api/models/clients';
import EditUser from 'src/components/users/EditUser.vue';
import EditClient from 'src/components/users/EditClient.vue';
import EditCoach from 'src/components/users/EditCoach.vue';
import api from 'src/api';
import { defineEmits, onBeforeMount, ref } from 'vue';
onBeforeMount(async () => {
  user.value = await api.users.getUserById(`${props.userId}`);
  if (user.value?.userType === 'coach') {
    coach.value = await api.users.getCoach(`${props.userId}`);
  }
  if (user.value?.userType === 'client') {
    client.value = await api.users.getClient(`${props.userId}`);
  }
});
const props = defineProps({
  userId: String,
});
const user = ref<GetUserModel>();
const coach = ref<GetCoachModel>();
const client = ref<GetClientModel>();

//const user = ref<GetUserDetailsModel>();

const displayDetails = ref(false);
function details() {
  displayDetails.value = !displayDetails.value;
}

const emit = defineEmits(['update']);
function update() {
  emit('update');
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
