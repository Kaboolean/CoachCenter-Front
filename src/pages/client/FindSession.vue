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
import { useRouter } from 'vue-router';

const sessionsList = ref<ListSessionModel[]>([]);
const clientInfo = ref();
onBeforeMount(async () => {
  sessionsList.value = await api.sessions.SessionsList();
  const user = store.getters['auth/getUser'];
  if (user.userType === 'client') {
    clientInfo.value = await api.users.getUserById(user.userId);
    console.log(clientInfo.value);
  }
});

const router = useRouter();
const $q = useQuasar();
const store = useStore();
async function subscribeToSession(sessionId: string) {
  const user = store.getters['auth/getUser'];
  if (user.userType !== 'client') {
    return;
  }
  if (
    clientInfo.value.firstName === null ||
    clientInfo.value.birthDate === null
  ) {
    console.log('Update your profile first before joining sessions');
    $q.dialog({
      component: ConfirmDialog,

      // props forwarded to your custom component
      componentProps: {
        title: 'Subscribe',
        message: 'Update your profile first before joining sessions',
        OkBtnMsg: 'Go to your client account',
        cancelBtnMsg: 'Cancel',
        // ...more..props...
      },
    })
      .onOk(async () => {
        router.push('/account');
        $q.notify({
          message: 'You can update your profile on this page',
          color: 'primary',
        });
      })
      .onCancel(() => {
        //console.log('Cancel');
      })
      .onDismiss(() => {
        //console.log('Called on OK or Cancel');
      });
    return;
  }
  $q.dialog({
    component: ConfirmDialog,

    // props forwarded to your custom component
    componentProps: {
      title: 'Subscribe',
      message: 'You are about to subscribe to this session',
      OkBtnMsg: 'Join',
      cancelBtnMsg: 'Cancel',
      // ...more..props...
    },
  })
    .onOk(async () => {
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
</script>
