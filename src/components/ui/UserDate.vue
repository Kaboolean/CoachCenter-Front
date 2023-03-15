<template>
  <div>
    <label>{{ label }} :</label>
    <q-input
      @update:model-value="onChange"
      filled
      type="text"
      v-model="localValue"
      hide-bottom-space
      dense
      class="qinput-width-small"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date
              mask="DD/MM/YYYY"
              @update:model-value="onChange"
              v-model="localValue"
            ></q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits, ref, onMounted, watch } from 'vue';
import { formatDate } from 'src/utils/dateUtils';
import { DateTime } from 'luxon';
import { date } from 'quasar';

onMounted(() => {
  localValue.value = formatDate(props.modelValue);
});

function onChange(dateStr?: string | null) {
  if (!isValid(dateStr)) {
    emit('update:model-value', null);
  } else {
    const validDate = DateTime.fromFormat(dateStr, 'dd/MM/yyyy').toJSON();
    emit('update:model-value', validDate);
  }
}
function isValid(dateStr?: string | null) {
  if (!dateStr) {
    return false;
  }
  const extracted = date.extractDate(dateStr, 'DD/MM/YYYY');
  if (!extracted) {
    return false;
  }
  return date.isValid(extracted.toString());
}
const props = defineProps<{
  modelValue?: string | null;
  label?: string | null;
}>();
const emit = defineEmits<{
  (e: 'update:model-value', value: string | null): void;
}>();
const localValue = ref();

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localValue.value = formatDate(newVal);
    }
  }
);
</script>
