<template>
  <div>
    <q-card class="my-card">
      <div class="row">
        <q-card-section
          class="bg-primary text-white"
          :class="mode ? 'col-md-8' : 'col-md-12'"
        >
          <div class="text-h6">{{ session.name }}</div>
          <div class="text-subtitle2">{{ formatDate(session.date) }}</div>
        </q-card-section>
        <q-card-section
          v-if="mode"
          class="col-md-4 justify-center items-center"
        >
          <q-btn @click="action">{{ mode }}</q-btn>
        </q-card-section>
      </div>

      <q-separator />

      <q-card-section>
        <div>
          <q-icon name="location_on" size="sm"></q-icon> {{ session.location }}
        </div>
        <div>
          <q-icon name="surfing" size="sm"></q-icon>
          {{
            session.participantCount
              ? `${session.participantCount} participants`
              : message
          }}
        </div>
        <q-chip
          v-for="tag in session.tags"
          :key="tag"
          dense
          color="orange"
          text-color="white"
        >
          {{ tag }}
        </q-chip>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from 'src/utils/dateUtils';
import { defineProps, defineEmits } from 'vue';

import { GetSessionModel, ListSessionModel } from 'src/api/models/sessions';
const props = defineProps<{
  session: ListSessionModel | GetSessionModel;
  message: string | null;
  mode: string | null;
}>();

const emit = defineEmits(['action']);
function action() {
  emit('action');
}
</script>
