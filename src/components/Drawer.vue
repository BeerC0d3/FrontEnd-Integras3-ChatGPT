<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
    <div class="content-drawer text-center">
      <div class="head-drawer">
        <q-card
          flat
          bordered
          class="col-6 col-xs-12 col-sm-10 col-lg-10 col-md-10"
        >
          <q-card-section class="text-center">
            <q-btn
              flat
              color="primary"
              label="Accesar"
              icon="fa-solid fa-right-to-bracket"
              to="/admin/login"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="bottom-drawer">
        <Carousel :context-support="resultParents" />
      </div>
      <!-- <div class="bg-grey-2">
        <p class="text-center">Mis busquedas</p>
      </div>
      <q-scroll-area style="height: 350px">
        <Questions />
      </q-scroll-area> -->
      <!-- <div class="bottom-drawer">
        <Carousel :context-support="resultParents" />
      </div> -->
    </div>
  </q-drawer>
</template>
<script setup lang="ts">
import { ref, inject, onBeforeMount } from 'vue';
import Questions from '../components/Questions.vue';
import Carousel from '../components/Carousel.vue';
import useHookChat from '../hooks/hookChat';
import { useChatStore } from 'src/stores/all';

const bus = inject<any>('bus');
const $useChat = useChatStore();
const { getByParents, resultParents } = useHookChat();

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onBeforeMount(async () => {
  await getByParents();
  if (resultParents.value.length == 1) {
    $useChat.setChatContextParent(resultParents.value[0].id);
    bus.emit('refreshSelectModulo');
  }
});

bus.on('drawerOpen', (drawerOpen: boolean) => {
  leftDrawerOpen.value = drawerOpen;
  //console.log('recibiendo: ' + leftDrawerOpen.value);
});
</script>
<style scoped>
.content-drawer {
  height: auto;
  display: flex;
  flex-direction: column;
}
.head-drawer {
  align-items: center;
  padding: 5px;
  margin-bottom: 15px;
}
.bottom-drawer {
  padding: 5px;
}
</style>
