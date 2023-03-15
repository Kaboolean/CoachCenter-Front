<template>
  <div class="row justify-center">
    <div class="col">
      <h4>{{ $t('users') }}</h4>
    </div>
    <div class="col-auto">
      <q-btn class="q-ml-sm" icon-right="refresh" @click="refresh"
        >Refresh List</q-btn
      >
      <q-btn class="q-ml-sm" v-if="selected.length" @click="deleteUsers"
        >Delete {{ selected.length > 1 ? 'users ' : 'user ' }}</q-btn
      >
      <q-btn class="q-ml-sm" icon-right="add_circle" @click="createUser"
        >Create user</q-btn
      >
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-12">
      <q-table
        title="Users"
        :rows="users"
        :columns="columns"
        row-key="id"
        selection="multiple"
        v-model:selected="selected"
        :loading="isLoading"
        @row-dblclick="editUser"
      >
      </q-table>
    </div>

    <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
  </div>
  <!-- User details qtable -->
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
  <router-view v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <component
        :is="Component"
        :key="route.path"
        @update="refresh"
      ></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import api from 'src/api/index';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue';
import { ListUserModel } from 'src/api/models/users';
import { onBeforeMount, ref } from 'vue';
onBeforeMount(async () => {
  //utilisation de la méthode .list() de la classe UsersResource
  users.value = await api.users.list();
});

async function refresh() {
  isLoading.value = true;
  users.value = await api.users.list();
  isLoading.value = false;
}
const router = useRouter();
const route = useRoute();

const $q = useQuasar();

const isLoading = ref(false);
const users = ref<ListUserModel[]>([]);
const selected = ref<ListUserModel[]>([]);

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

async function deleteUsers() {
  $q.dialog({
    component: ConfirmDialog,

    // props forwarded to your custom component
    componentProps: {
      title: 'Warning',
      message: 'You are about to delete the selected users',

      // ...more..props...
    },
  })
    .onOk(async () => {
      try {
        //delete
        const promises: Promise<void>[] = [];
        selected.value.forEach((selection) =>
          promises.push(api.users.deleteUserById(selection.id))
        );
        await Promise.all(promises);
        //refresh
        if (
          selected.value.some(
            (selection) => selection.id === route.params.userId
          )
        ) {
          router.push('/users');
        }
        selected.value = [];
        users.value = await api.users.list();
        $q.notify({
          message: 'User(s) deleted.',
          color: 'primary',
        });
      } catch (err) {
        console.log(err);
      }
    })
    .onCancel(() => {
      //console.log('Cancel');
    })
    .onDismiss(() => {
      //console.log('Called on OK or Cancel');
    });
}

function createUser() {
  router.push('/users/create');
}
function editUser(_: Event, row) {
  if (route.params.userId === row.id) {
    router.push('/users');
  } else {
    router.push(`/users/${row.id}`);
  }
}
</script>

<style>
body {
  max-width: 95%;
}
.q-table tbody td:before {
  background: rgba(0, 131, 105, 0.1);
}
.q-table tbody td:after {
  background: rgba(0, 131, 105, 0.2);
}
.route-enter-from {
  opacity: 0;
  transform: translateX(50%);
}
.route-enter-active {
  transition: all 0.15s ease-out;
}
.route-enter-to {
  opacity: 1;
}
.route-leave-from {
  opacity: 1;
}
.route-leave-active {
  transition: all 0.15s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
