<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">
          {{ participant.firstName }} {{ participant.lastName }}
        </div>
        <div class="text-subtitle2">{{ participant.age }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div>
          <q-icon name="badge" size="sm" />
          {{ participant.userName }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

import { ListParticipantModel } from 'src/api/models/users';
const props = defineProps<{
  participant: ListParticipantModel;
}>();
</script>
