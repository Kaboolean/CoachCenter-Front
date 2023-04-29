<template>
  <div>
    <h5 v-if="coachSessionsList.length < 1">
      You haven't created any session yet
    </h5>
    <div v-if="router.currentRoute.value.name === 'sessionsList'">
      <div class="row justify-center" v-if="coachSessionsList.length">
        <h5>Sessions you created</h5>
      </div>
      <div class="row">
        <SessionCard
          class="col-md-4 col-lg-2 col-sm-12 cursor-pointer q-mr-md q-mb-md"
          v-for="session in coachSessionsList"
          :key="session.id"
          :session="session"
          :message="'Personne ne participe encore'"
          clickable
          @click="checkSession(session.id)"
          @dblclick="editSession(session.id)"
        ></SessionCard>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import SessionCard from 'src/components/sessions/SessionCard.vue';
import { ListSessionModel } from 'src/api/models/sessions';
import api from 'src/api';
import { onBeforeMount, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
const store = useStore();
const coachSessionsList = ref<ListSessionModel[]>([]);
onBeforeMount(async () => {
  coachSessionsList.value = await api.sessions.GetCoachSessions(
    store.getters['auth/getUserId']
  );
});

const router = useRouter();
let clicks = 0;
function checkSession(id: string) {
  clicks = 1;
  const timeoutId = setTimeout(function () {
    if (clicks == 2) {
      clearInterval(timeoutId);
      return;
    }
    router.push({
      name: 'check-session',
      params: {
        sessionId: id,
      },
    });
  }, 500);
}
function editSession(id: string) {
  clicks = 2;
  router.push({
    name: 'edit-session',
    params: {
      sessionId: id,
    },
  });
}
</script>

<style></style>
