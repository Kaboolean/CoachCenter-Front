<template>
  <router-view />
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { watch, computed } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
store.dispatch('auth/tryLogin');

const didAutoLogout = computed(() => store.getters['auth/isAutoLogout']);

watch(didAutoLogout, function (curVal, oldVal) {
  if (curVal && curVal != oldVal) {
    router.replace('/dashboard');
  }
});
</script>
