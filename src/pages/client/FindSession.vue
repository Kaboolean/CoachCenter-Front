<template>
  <div class="row">
    <div v-if="!sessionsList.length">
      <h5>No available sessions yet</h5>
      <h6>Wait for a coach to create one</h6>
    </div>
    <SessionCard
      class="col-md-4 col-lg-2 col-sm-12 cursor-pointer q-mr-md"
      v-for="session in sessionsList"
      :key="session.id"
      :session="session"
      :message="'Soyez le premier à participer'"
      @click="subscribeToSession(session.id)"
    ></SessionCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import SessionCard from '../../components/sessions/SessionCard.vue';
import api from 'src/api';
import { ListSessionModel } from 'src/api/models/sessions';
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';

const sessionsList = ref<ListSessionModel[]>([]);
onBeforeMount(async () => {
  sessionsList.value = await api.sessions.SessionsList();
});

const $q = useQuasar();
const store = useStore();
async function subscribeToSession(sessionId: string) {
  const user = store.getters['auth/getUser'];
  if (user.userType !== 'client') {
    return;
  }
  $q.dialog({
    component: ConfirmDialog,

    // props forwarded to your custom component
    componentProps: {
      title: 'Warning',
      message: 'You are about to subscribe to this session',
      OkBtnMsg: 'Join',
      cancelBtnMsg: 'Cancel',
      // ...more..props...
    },
  })
    .onOk(async () => {
      console.log(user.userId);
      console.log(sessionId);
      await api.sessions.JoinSession(sessionId);
      $q.notify({
        message: 'You joined this session',
        color: 'primary',
      });
      sessionsList.value = await api.sessions.SessionsList();
      try {
      } catch (err) {
        console.log(err);
      }
    })
    .onCancel(() => {
      //console.log('Cancel');
    })
    .onDismiss(() => {
      //console.log('Called on OK or Cancel');
    });
}

function test() {
  return;
}
</script>
