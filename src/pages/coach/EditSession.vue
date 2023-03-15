<template>
  <div>
    <q-form @submit.prevent="updateSession">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-md-3 col-xs-12">
          <user-input v-model="session.name" label="Session name" />
        </div>
        <div class="col-md-3 col-xs-12">
          <user-input v-model="session.location" label="Location" />
        </div>
        <div class="col-md-3 col-xs-12">
          <user-number v-model="session.duration" label="Duration (minutes)" />
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md q-mt-xs">
        <div class="col-md-3 col-xs-12">
          <user-input
            type="textarea"
            v-model="session.description"
            label="Description"
          />
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md q-mt-xs items-center">
        <div class="col-md-3 col-xs-12">
          <user-input
            @keydown.enter.prevent="addTag"
            v-model="newTags"
            label="Tags"
          />
        </div>
        <div class="col-md-9 col-xs-12">
          <q-chip
            v-for="tag in session.tags"
            clickable
            removable
            @remove="removeTag(tag)"
            :key="tag"
            dense
            color="orange"
            text-color="white"
            >{{ tag }}</q-chip
          >
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md q-mt-xs items-center">
        <user-date v-model="session.date" label="Date"></user-date>
        <span>{{ session.date }}</span>
      </div>
      <q-btn class="q-mt-md" type="submit">Update session</q-btn>
      <q-btn class="q-mt-md q-ml-md" color="red" @click="deleteSession"
        >Delete session</q-btn
      >
    </q-form>
  </div>
</template>

<script setup lang="ts">
import api from 'src/api';
import { onBeforeMount, ref } from 'vue';
import { UpdateSessionModel } from 'src/api/models/sessions';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue';

const props = defineProps({
  sessionId: String,
});
const session = ref<UpdateSessionModel>({
  id: '',
  name: '',
  date: '',
  location: '',
  duration: 0,
  description: '',
  tags: [],
});
onBeforeMount(async () => {
  const request = await api.sessions.GetSessionById(props.sessionId as string);
  session.value.id = request.id;
  session.value.name = request.name;
  session.value.date = request.date;
  session.value.location = request.location;
  session.value.duration = request.duration;
  session.value.description = request.description;
  session.value.tags = request.tags;
});

const router = useRouter();
const $q = useQuasar();
async function updateSession() {
  await api.sessions.UpdateSession(session.value);
  router.push('/sessions/list');
  $q.notify({
    message: 'Update successful.',
    color: 'primary',
  });
}
async function deleteSession() {
  $q.dialog({
    component: ConfirmDialog,

    // props forwarded to your custom component
    componentProps: {
      title: 'Warning',
      message: 'You are about to delete this session',

      // ...more..props...
    },
  })
    .onOk(async () => {
      try {
        //delete
        await api.sessions.DeleteSession(session.value.id);
        router.push('/sessions/list');
        $q.notify({
          message: 'Session deleted.',
          color: 'primary',
        });
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
// async function deleteSession() {
//   console.log(session.value.id);

// }

const newTags = ref();
function addTag() {
  if (newTags.value && !session.value.tags.includes(newTags.value)) {
    session.value.tags.push(newTags.value);
    newTags.value = '';
  }
}
function removeTag(tag: string) {
  session.value.tags = session.value.tags.filter((t) => t !== tag);
}
</script>
