<template>
  <q-page class="column justify-center items-center">
    <q-img
      src="~assets/gpt-integra3.png"
      spinner-color="white"
      style="max-width: 300px"
    ></q-img>
    <div class="text-grey-6 text-weight-bold text-h5">
      {{ $store.getUser.nombre }}
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useUserStore } from 'stores/all';
const $store = useUserStore();
</script>
