<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Coach Center </q-toolbar-title>

        <div v-if="!isAuthenticated.token">
          <q-btn to="/register">Register</q-btn>
        </div>
        <div v-if="!isAuthenticated.token">
          <q-btn to="/login">Login</q-btn>
        </div>
        <div v-else>
          <q-btn @click="logout">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="!leftDrawerOpen || miniState"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      :width="260"
      :mini-width="90"
      class="bg-white row"
    >
      <q-list class="q-mt-sm menu-navigation col-12">
        <q-item>
          <q-item-section>
            <q-item-label class="brand-text text-center">
              <span class="text-primary">DHOO</span>
              <span class="text-secondary">JOL</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <div class="q-mt-lg" />
        <MenuLink
          v-for="link in availableMenuLinks"
          :key="link.title"
          :miniState="miniState"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MenuLink from 'src/components/MenuLink.vue';
const availableMenuLinks = computed(() => {
  const result = [...menuLinksDefault];

  if (user.value.userType === 'client') {
    result.push(...clientItems);
  } else if (user.value.userType === 'coach') {
    result.push(...coachItems);
  } else if (user.value.userType === 'admin') {
    result.push(...adminItems);
  }
  return result;
});

const adminItems = [
  {
    title: 'Admin',
    name: 'users',
    icon: 'group',
    link: '/users',
  },
];
const menuLinksDefault = [
  {
    title: 'Dashboard',
    name: 'dashboard',
    icon: 'home',
    link: '/dashboard',
  },
];
// const menuLinksDefaultLength = menuLinksDefault.length;
// const menuLinks = ref(menuLinksDefault);

const clientItems = [
  {
    title: 'My client account',
    name: 'Account',
    icon: 'settings',
    link: '/account',
  },
  {
    title: 'Find a session',
    name: 'Sessions',
    icon: 'fitness_center',
    link: '/sessions',
  },
];
const coachItems = [
  {
    title: 'My coach account',
    name: 'Account',
    icon: 'settings',
    link: '/account',
  },
  {
    title: 'Create a session',
    name: 'CreateSession',
    icon: 'directions_run',
    link: '/create',
  },
];

const store = useStore();
const user = computed(() => store.getters['auth/getUser']);
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
// if (isAuthenticated.value.token) {
//   if (isAuthenticated.value.userType === 'client') {
//     menuLinks.value.push(...clientItems);
//   }
//   if (isAuthenticated.value.userType === 'coach') {
//     menuLinks.value.push(...coachItems);
//   }
// }

// watch(isAuthenticated, function (curVal, oldVal) {
//   if (curVal.token) {
//     if (curVal.userType === 'client') {
//       menuLinks.value.push(...clientItems);
//     } else if (curVal.userType === 'coach') {
//       menuLinks.value.push(...coachItems);
//     }
//   }
//   if (!curVal.token) {
//     if (oldVal.userType === 'client') {
//       menuLinks.value.splice(menuLinksDefaultLength, clientItems.length);
//     }
//     if (oldVal.userType === 'coach') {
//       menuLinks.value.splice(menuLinksDefaultLength, coachItems.length);
//     }
//   }
// });

const leftDrawerOpen = ref(false);
const miniState = ref(false);
const miniPersistent = ref(false);
const onMouseOver = () => {
  if (miniPersistent.value) {
    miniState.value = false;
  }
};
const onMouseOut = () => {
  if (miniPersistent.value) {
    miniState.value = true;
  }
};
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const router = useRouter();
async function logout() {
  await store.dispatch('auth/logout');
  router.replace({ path: '/' });
}
</script>

<style lang="scss" scoped>
.menu-navigation {
  letter-spacing: 0.02rem;
  font-weight: 500;
  font-size: 14px;
  color: rgba($primary, 0.7) !important;
}

.brand-text {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 0.48px;
}

.menu-container {
  & .menu-active {
    color: $primary !important;
    border-bottom: 2px solid $primary;
  }
}
</style>
