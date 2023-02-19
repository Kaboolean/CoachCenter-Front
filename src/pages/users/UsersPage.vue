<template>
  <div class="row">
    <h4>{{ $t('users') }}</h4>
  </div>

  <div class="row q-mt-md">
    <div class="col-12">
      <q-table
        title="Users"
        :rows="users"
        :columns="columns"
        row-key="id"
        selection="single"
        v-model:selected="selected"
      />
    </div>

    <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
  </div>
  <div v-if="selected.length" class="row q-mt-md">
    <div class="col-12">
      <q-table
        title="User Details"
        :rows="selected"
        :columns="detailsColumns"
        row-key="id"
        :hide-pagination="true"
      />
    </div>
  </div>
  <q-btn @click="display">Test</q-btn>
</template>

<script setup lang="ts">
import api from 'src/api';
//importation du DTO ListUserModel
import { ListUserModel } from 'src/api/models/users';
import { onBeforeMount, ref, watch } from 'vue';
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref<ListUserModel[]>([]);
const selected = ref([]);
const columns = ref([
  {
    name: 'userName',
    field: 'email',
    required: true,
    label: 'UserName',
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    name: 'firstName',
    align: 'left',
    label: 'First name',
    field: 'firstName',
    sortable: true,
  },
  {
    name: 'lastName',
    align: 'left',
    label: 'Last name',
    field: 'lastName',
    sortable: true,
  },
]);
const detailsColumns = ref([
  {
    name: 'userId',
    field: 'id',
    required: true,
    label: 'User Id',
    align: 'left',
    sortable: false,
  },
  {
    name: 'birthDate',
    field: 'birthDate',
    required: true,
    label: 'Birthdate',
    align: 'left',
    sortable: false,
  },
  {
    name: 'lastLoginDate',
    field: 'lastLoginDate',
    required: false,
    label: 'Last login date',
    align: 'left',
    sortable: false,
  },
]);

function display() {
  console.log(selected);
}

watch(selected.value, function (curVal, oldVal) {
  //selected.value = [];
  if (selected.value.length) {
    const curValToRaw = toRaw(curVal);
  } else {
    return;
  }
});

// function display(users) {
//   console.log(users);
// }

onBeforeMount(async () => {
  //utilisation de la méthode .list() de la classe UsersResource
  users.value = await api.users.list();
});
</script>
