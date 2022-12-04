<template>
  <q-item
    clickable
    v-ripple
    :to="link"
    class="q-mx-lg q-mb-sm"
    :active-class="!miniState ? 'menu-active' : 'text-primary'"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon size="24" :name="icon"></q-icon>
    </q-item-section>
    <q-item-section class="ellipsis">
      <q-item-label>
        {{ title }}
        <q-badge
          color="orange-4"
          v-if="alertCount"
          text-color="white"
          class="text-weight-bold"
          transparent
          rounded
        >
          {{ alertCount }}
        </q-badge>
      </q-item-label>
      <q-item-label caption v-if="caption">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  caption?: string;
  link?: string;
  icon?: string;
  alertCount?: number;
  miniState?: boolean;
}>();
</script>

<style lang="scss" scoped>
.menu-active {
  background-color: #fafbfb;
  border-right: 0.35rem solid #1bbc9c;
  border-radius: 0.35rem;
  color: $primary;
  font-weight: 600;

  & .vue-feather {
    color: #1bbc9c;
  }
}
</style>
