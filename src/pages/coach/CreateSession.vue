<template>
  <div>
    <q-form @submit.prevent="createSession">
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
        <!-- <span>{{ session.date }}</span> -->
      </div>
      <q-btn class="q-mt-md" type="submit">Create session</q-btn>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CreateSessionModel } from '../../api/models/sessions';
import api from 'src/api';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const session = ref<CreateSessionModel>({
  name: '',
  date: '',
  location: '',
  duration: 0,
  description: '',
  tags: [],
});
const newTags = ref();
const router = useRouter();
const $q = useQuasar();
async function createSession() {
  await api.sessions.CreateSession(session.value);
  router.push('/sessions/list');
  $q.notify({
    message: 'Session created !',
    color: 'primary',
  });
}
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

<style>
.qinput-width-small {
  max-width: 200px;
}
.qinput-width-medium {
  max-width: 300px;
}
</style>
