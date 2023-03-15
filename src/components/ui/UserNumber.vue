<template>
  <div>
    <label>{{ label }} :</label>

    <q-input
      filled
      type="number"
      v-bind="$attrs"
      v-model.number="localValue"
      hide-bottom-space
      dense
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue';

const props = defineProps<{
  modelValue?: number | null;
  label?: string | null;
}>();
const emit = defineEmits<{
  (e: 'update:model-value', value: number | null): void;
}>();
const localValue = computed({
  get: () => props.modelValue,

  set: (value) => {
    emit('update:model-value', value!);
  },
});
</script>
