<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ session.name }}</div>
        <div class="text-subtitle2">{{ formatDate(session.date) }}</div>
      </q-card-section>

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
import { defineProps } from 'vue';

import { ListSessionModel } from 'src/api/models/sessions';
const props = defineProps<{
  session: ListSessionModel;
  message: string | null;
}>();
</script>
