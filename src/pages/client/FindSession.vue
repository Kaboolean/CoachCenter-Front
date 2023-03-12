<template>
  <div class="row">
    <SessionCard
      class="col-md-4 col-lg-2 col-sm-12"
      v-for="session in sessionsList"
      :key="session.id"
      :session="session"
    ></SessionCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import SessionCard from '../../components/sessions/SessionCard.vue';
import api from 'src/api';
import { ListSessionModel } from 'src/api/models/sessions';
const sessionsList = ref<ListSessionModel[]>([]);
onBeforeMount(async () => {
  sessionsList.value = await api.sessions.SessionsList();
});

console.log(sessionsList);
</script>
