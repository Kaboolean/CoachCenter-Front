<template>
  <div class="header">
    <div class="row q-ma-xl">
      <div class="col-md-8">
        <h3>Find sport sessions all across the country</h3>
        <div class="row">
          <h4>Many coaches matching your needs</h4>
        </div>
      </div>
      <div class="col-md-4">
        <q-img
          src="src/assets/sport.jpg"
          style="height: 500px; max-width: 750px"
          class="img"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.img {
  width: 100%;
  grid-column: 2 / 3;
  grid-row: 1 / span 4;
  transform: translateY(-6rem);
}
</style>
