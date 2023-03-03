<template>
  <router-view />
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
store.dispatch('auth/autoLogin');
</script>
