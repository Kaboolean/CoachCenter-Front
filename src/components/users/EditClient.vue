<template>
  <q-card>
    <q-card-section>
      <q-form @submit.prevent="updateClient" class="q-gutter-md">
        <!-- <div class="row items-center">
          <div class="text-h5 q-mr-xs">Edit coach details</div>
        </div> -->
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <div class="row items-center">
              <div class="col-auto">Goal :</div>
              <div class="col">
                <q-input
                  filled
                  type="text"
                  v-model="innerValue.goal"
                  lazy-rules
                  hide-bottom-space
                  dense
                  class="qinput-width-small"
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
                    (val) => (val && val.length > 0) || 'Please enter a value',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium"
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
                    (val) => (val && val.length > 0) || 'Please enter a value',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium"
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
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please enter a value',
                  ]"
                  hide-bottom-space
                  dense
                  class="qinput-width-medium"
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
import { GetClientModel, GetClientModelWithId } from 'src/api/models/clients';
import { onMounted, ref, defineEmits } from 'vue';
const innerValue = ref<GetClientModelWithId>({
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

onMounted(() => {
  innerValue.value.userId = props.userId;
  innerValue.value.goal = props.client?.goal;
  innerValue.value.age = props.client?.age;
  innerValue.value.height = props.client?.height;
  innerValue.value.weight = props.client?.weight;
  innerValue.value.handicap = props.client?.handicap;
});

const emit = defineEmits(['updateClient']);
async function updateClient() {
  console.log(innerValue.value.goal, ' ', innerValue.value.height);
  await api.users.updateClient({
    userId: innerValue.value.userId,
    goal: innerValue.value.goal,
    age: innerValue.value.age,
    height: innerValue.value.height,
    weight: innerValue.value.weight,
    handicap: innerValue.value.handicap,
  });
  emit('updateClient');
}
</script>
