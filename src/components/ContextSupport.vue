<template>
  <ul>
    <li v-for="item in list" ref="itemRefs" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const list = ref([1, 2, 3]);
const itemRefs = ref([]);
</script>
