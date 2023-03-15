<template>
  <div>
    <label>{{ label }} :</label>
    <q-input
      filled
      v-bind="$attrs"
      :model-value="modelValue"
      hide-bottom-space
      dense
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  modelValue?: string | null;
  label?: string | null;
}>();
</script>
