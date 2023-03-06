<template>
  <q-page>
    <div>
      <h5>Account id : {{ userId }}</h5>
      <h6>User type : {{ userType }}</h6>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore();
const userId = ref(store.getters['auth/getUserId']);
const userType = ref(store.getters['auth/getUserType']);
</script>
