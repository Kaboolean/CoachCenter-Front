<template>
  <div>
    <div class="row justify-center q-mt-sm">
      <h5>Session participants</h5>
    </div>
    <div class="row justify-center">
      <SessionCard
        :session="session"
        :message="null"
        class="q-mb-sm q-mr-sm"
      ></SessionCard>
    </div>
    <div class="row">
      <ParticipantCard
        class="col-md-4 col-lg-2 col-sm-12 cursor-pointer q-mr-sm q-mb-sm"
        v-for="participant in participantList"
        :key="participant.userId"
        :participant="participant"
      ></ParticipantCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ParticipantCard from 'src/components/sessions/ParticipantCard.vue';
import SessionCard from 'src/components/sessions/SessionCard.vue';
import { ListParticipantModel } from 'src/api/models/users';
import api from 'src/api';

const participantList = ref<ListParticipantModel[]>([]);
const session = ref();
onBeforeMount(async () => {
  participantList.value = await api.sessions.GetSessionParticipants(
    props.sessionId as string
  );
  session.value = await api.sessions.GetSessionById(props.sessionId as string);
  console.log(participantList.value);
  console.log(session.value);
});

const props = defineProps({
  sessionId: String,
});
</script>
