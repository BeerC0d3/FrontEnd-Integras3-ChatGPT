<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="text-white bg-primary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Dashboard
        </q-toolbar-title>
        <q-btn
          dense
          flat
          round
          icon="fa-solid fa-right-from-bracket"
          @click="Salir"
        />
      </q-toolbar>
    </q-header>
    <drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/all';
import Drawer from '../components/Drawer.vue';
const $store = useUserStore();
const $router = useRouter();

const bus = inject<any>('bus');
const leftDrawerOpen = ref(true);

const toggleLeftDrawer = () => {
  if (leftDrawerOpen.value) leftDrawerOpen.value = false;
  else if (!leftDrawerOpen.value) leftDrawerOpen.value = true;

  bus.emit('drawerOpen', leftDrawerOpen.value);
};

const Salir = (): void => {
  $store.logout();
  $router.push('/admin/login');
};
</script>
<style scoped>
.bg-header {
  background-color: #10a37f;
}
</style>
