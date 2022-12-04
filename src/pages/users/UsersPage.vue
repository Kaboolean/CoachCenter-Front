<template>
  <div class="row">
    <h4>{{ $t('users') }}</h4>
  </div>
  <div class="row q-mt-md">
    <div class="col-12">
      <q-table :rows="users" :columns="columns" row-key="id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import api from 'src/api';
import { ListUserModel } from 'src/api/models/users';
import { onBeforeMount, ref } from 'vue';

const users = ref<ListUserModel[]>([]);

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

onBeforeMount(async () => {
  users.value = await api.users.list();
});
</script>
