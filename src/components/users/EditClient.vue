<template>
  <q-card>
    <q-card-section>
      <q-form @submit.prevent="updateClient" class="q-gutter-md">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Goal :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.goal"
                  hide-bottom-space
                  dense
                  class="qinput-width-small q-mb-sm"
                />
              </div>
            </div>
          </div>

          <div class="col-md-3 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Height :</div>
              <div class="col">
                <q-input
                  filled
                  type="number"
                  v-model="innerValue.height"
                  lazy-rules
                  :rules="[
                    () =>
                      (innerValue.height && innerValue.height > 0) ||
                      'Please enter a value',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium q-mb-sm"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Weight :</div>
              <div class="col">
                <q-input
                  filled
                  type="number"
                  v-model="innerValue.weight"
                  lazy-rules
                  :rules="[
                    () =>
                      (innerValue.weight && innerValue.weight > 0) ||
                      'Please enter a value',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium q-mb-sm"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Handicap :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.handicap"
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
import { GetClientModel, UpdateClientModel } from 'src/api/models/clients';
import { onBeforeMount, ref, defineEmits } from 'vue';
import { useQuasar } from 'quasar';

const innerValue = ref<UpdateClientModel>({
  userId: '',
  goal: '',
  age: 0,
  height: 0,
  weight: 0,
  handicap: '',
});
const props = defineProps<{
  userId: string;
  client: GetClientModel;
}>();

onBeforeMount(() => {
  innerValue.value.userId = props.userId;
  innerValue.value.goal = props.client?.goal;
  innerValue.value.age = props.client?.age;
  innerValue.value.height = props.client?.height;
  innerValue.value.weight = props.client?.weight;
  innerValue.value.handicap = props.client?.handicap;
});

const emit = defineEmits(['updateClient']);
const $q = useQuasar();
async function updateClient() {
  await api.users.updateClient({
    userId: innerValue.value.userId,
    goal: innerValue.value.goal,
    age: innerValue.value.age,
    height: innerValue.value.height,
    weight: innerValue.value.weight,
    handicap: innerValue.value.handicap,
  });
  emit('updateClient');
  $q.notify({
    message: 'Client details updated.',
    color: 'primary',
  });
}
</script>
