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
          v-for="link in menuLinks"
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
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { toRaw } from 'vue';
import MenuLink from 'src/components/MenuLink.vue';
//import router from 'src/router';

const leftDrawerOpen = ref(false);
const miniState = ref(false);
const miniPersistent = ref(false);

const menuLinks = ref([
  {
    title: 'Dashboard',
    name: 'dashboard',
    icon: 'home',
    link: '/dashboard',
  },
  {
    title: 'Users',
    name: 'users',
    icon: 'group',
    link: '/users',
  },
]);

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

const store = useStore();
const router = useRouter();

const clientItems = [
  {
    title: 'My client account',
    name: 'Account',
    icon: 'settings',
    link: '/account',
  },
];
const coachItems = [
  {
    title: 'My coach account',
    name: 'Account',
    icon: 'settings',
    link: '/account',
  },
];

// const menuLinksComputed = computed(() => toRaw(menuLinks.value));
// console.log(menuLinksComputed.value);

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
if (isAuthenticated.value.token) {
  menuLinks.value.push({
    title: 'My account',
    name: 'Account',
    icon: 'settings',
    link: '/account',
  });
}

watch(isAuthenticated, function (curVal, oldVal) {
  if (curVal.token) {
    if (curVal.userType === 'coach') {
      menuLinks.value.push(...clientItems);
    } else if (curVal.userType === 'client') {
      menuLinks.value.push(...coachItems);
    }
  }
  if (!curVal.token) {
    console.log('test');
    if (oldVal.userType === 'client') {
      menuLinks.value.splice(2, clientItems.length + 1);
    }
    if (oldVal.userType === 'coach') {
      menuLinks.value.splice(2, coachItems.length + 1);
    }
  }
});

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
