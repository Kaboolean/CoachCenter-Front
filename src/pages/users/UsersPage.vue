<template>
  <div class="row">
    <h4>{{ $t('users') }}</h4>
    <q-btn @click="refresh" style="position: absolute; right: 12.5%"
      >Refresh List</q-btn
    >
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
        :loading="isLoading"
      >
        <!-- props est la donnée du row transmise -->
        <template v-slot:body-cell-delete="props">
          <q-tr>
            <q-td :props="props">
              <q-btn
                name="delete"
                label="delete"
                icon="delete"
                @click="deleteUser(props.row.id)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
</template>

<script setup lang="ts">
import api from 'src/api';
import { useQuasar } from 'quasar';
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue';
//importation du DTO ListUserModel
import { ListUserModel } from 'src/api/models/users';
import { onBeforeMount, ref, watch } from 'vue';
import { toRaw } from 'vue';
onBeforeMount(async () => {
  //utilisation de la méthode .list() de la classe UsersResource
  users.value = await api.users.list();
  console.log(users.value);
});
async function refresh() {
  isLoading.value = true;
  users.value = await api.users.list();
  isLoading.value = false;
}
const $q = useQuasar();

const isLoading = ref(false);
const users = ref<ListUserModel[]>([]);
const selected = ref([]);
const columns = ref([
  {
    name: 'userName',
    field: 'userName',
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
  {
    name: 'userType',
    align: 'left',
    label: 'User Type',
    field: 'userType',
    sortable: true,
  },
  {
    name: 'delete',
    field: 'delete',
    sortable: false,
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

async function deleteUser(id) {
  $q.dialog({
    component: ConfirmDialog,

    // props forwarded to your custom component
    componentProps: {
      title: 'Warning',
      message: 'You are about to delete this user :',

      // ...more..props...
    },
  })
    .onOk(async () => {
      try {
        //delete
        await api.users.deleteUserById(id);
        //refresh
        users.value = await api.users.list();
      } catch (err) {
        console.log(err);
      }
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
}
</script>
