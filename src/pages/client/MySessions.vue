<template>
  <h5 v-if="!ClientSessionsList.length">
    You are not subscribed to any sessions yet
  </h5>
  <div class="row">
    <SessionCard
      class="col-md-4 col-lg-2 col-sm-12 cursor-pointer q-mr-md"
      v-for="session in ClientSessionsList"
      :key="session.id"
      :session="session"
      :message="null"
      mode="leave"
      @action="leaveSession(session.id)"
    ></SessionCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import api from 'src/api';
import { ListSessionModel } from 'src/api/models/sessions';
import SessionCard from '../../components/sessions/SessionCard.vue';

const ClientSessionsList = ref<ListSessionModel[]>([]);

onBeforeMount(async () => {
  ClientSessionsList.value = await api.sessions.GetClientSessions();
});
async function leaveSession(sessionId: string) {
  await api.sessions.DeleteSessionParticipant(sessionId);
  ClientSessionsList.value = await api.sessions.GetClientSessions();
}
</script>
