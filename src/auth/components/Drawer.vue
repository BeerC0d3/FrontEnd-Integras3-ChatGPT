<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    bordered
    :breakpoint="400"
    class="bg-drawer"
    style="background-color: #10a37f !important; color: #fff"
  >
    <!-- drawer content -->
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <context-support-recursive
          v-for="item in listContext"
          :key="item.id"
          v-bind="item"
        />
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      src="~assets/chatgpt-header3.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent text-center">
        <!-- <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar> -->
        <div class="text-weight-bold">{{ $store.getUser.nombre }}</div>
        <div>Administrador</div>
      </div>
    </q-img>
  </q-drawer>
</template>
<script setup lang="ts">
import { ref, inject, onBeforeMount } from 'vue';
import ContextSupportRecursive from './ContextSupportRecursive.vue';
import useHookContextSupport from '../hooks/hookContextSupport';
import { useCommonStore, useUserStore } from 'stores/all';

const bus = inject<any>('bus');
const leftDrawerOpen = ref(true);
const $commonStore = useCommonStore();
const $store = useUserStore();

bus.on('drawerOpen', (drawerOpen: boolean) => {
  leftDrawerOpen.value = drawerOpen;
});

bus.on('refreshContextSupport', async () => {
  $commonStore.Add_Request();
  await getAll();
});
const { getAll, listContext } = useHookContextSupport();
onBeforeMount(async () => {
  try {
    $commonStore.Add_Request();
    await getAll();
  } catch (e) {
    $commonStore.Remove_Request();
    console.log(e);
  }
});
</script>
<style>
/* .bg-drawer {
  background-color: #99a310 !important;
} */
</style>
