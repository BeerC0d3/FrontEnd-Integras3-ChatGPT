<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-auth flex-center">
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animated bounceInLeft">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
const style = computed(() => ({
  height: $q.screen.height + 'px',
}));
const $q = useQuasar();
$q.dark.set(false);
</script>
