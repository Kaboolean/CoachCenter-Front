<template>
  <q-card>
    <q-card-section>
      <q-form @submit.prevent="updateCoach" class="q-gutter-md">
        <!-- <div class="row items-center">
          <div class="text-h5 q-mr-xs">Edit coach details</div>
        </div> -->
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Grades :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.grades"
                  hide-bottom-space
                  dense
                  class="qinput-width-small q-mb-sm"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Description :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.description"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium q-mb-sm"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Hourly Rate :</div>
              <div class="col">
                <q-input
                  filled
                  type="number"
                  v-model="innerValue.hourlyRate"
                  lazy-rules
                  :rules="[
                    () =>
                      (innerValue.hourlyRate && innerValue.hourlyRate > 0) ||
                      'Please enter a value',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium q-mb-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <q-btn type="submitForm">Update</q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import api from 'src/api';
import { GetCoachModel, UpdateCoachModel } from 'src/api/models/coaches';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';

const innerValue = ref<UpdateCoachModel>({
  userId: '',
  grades: '',
  description: '',
  hourlyRate: 0,
});
const props = defineProps<{
  userId: string;
  coach: GetCoachModel;
}>();

onMounted(() => {
  innerValue.value.userId = props.userId;
  innerValue.value.grades = props.coach.grades;
  innerValue.value.description = props.coach.description;
  innerValue.value.hourlyRate = props.coach.hourlyRate;
});

const emit = defineEmits(['updateCoach']);
const $q = useQuasar();
async function updateCoach() {
  await api.users.updateCoach({
    userId: innerValue.value.userId,
    grades: innerValue.value.grades,
    description: innerValue.value.description,
    hourlyRate: innerValue.value.hourlyRate,
  });
  emit('updateCoach');
  $q.notify({
    message: 'Coach details updated.',
    color: 'primary',
  });
}
</script>
