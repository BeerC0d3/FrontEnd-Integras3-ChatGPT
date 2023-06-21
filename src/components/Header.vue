<template>
  <q-header elevated>
    <q-toolbar class="bg-grey-3 text-grey-8">
      <q-btn round flat icon="keyboard_arrow_left" @click="toggleLeftDrawer" />

      <span class="q-subtitle-2 q-pl-md text-blue-grey-13">
        {{ selectedContext }}
      </span>
      <!-- <div class="text-center" style="max-width: 350px">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="q-gutter-md">
            <q-select
              filled
              v-model="model"
              :options="selectContextSupport"
              option-label="name"
              option-value="id"
              map-options
              stack-label
              color="primary"
              @update:model-value="(val) => changeModulo(val)"
            >
              <template v-slot:selected-item="scope">
                Modulo:
                <q-chip
                  removable
                  square
                  dense
                  @remove="scope.removeAtIndex(scope.index)"
                  :tabindex="scope.tabindex"
                  color="white"
                  text-color="primary"
                  class=""
                >
                  <q-avatar color="primary" text-color="white" rounded>
                    <img :src="scope.opt.logo" />
                  </q-avatar>
                  {{ scope.opt.name }}
                </q-chip>
              </template>
            </q-select>
          </div>
        </transition>
        <q-inner-loading :showing="visible">
          <q-spinner-facebook color="deep-orange" size="2em" />
        </q-inner-loading>
      </div> -->
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { IChatContextSupport } from 'src/types/chatModel';
import { inject, ref, onBeforeMount } from 'vue';
import useHookChat from '../hooks/hookChat';
import { useChatStore } from 'src/stores/all';

const bus = inject<any>('bus');
const leftDrawerOpen = ref(true);
const visible = ref(false);
const $useChat = useChatStore();
const selectedContext = ref('Chat IntegraS3 con GPT');

const selectContextSupport = ref<IChatContextSupport[]>([]);
const { resultContext, getByParentId } = useHookChat();
const model = ref<IChatContextSupport>({
  id: 0,
  name: 'Seleccione el módulo',
  logo: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
});

bus.on('refreshSelectModulo', async () => {
  // visible.value = true;
  // await getByParentId($useChat.getContextSupportParentId);
  // selectContextSupport.value = resultContext.value;
  // resetSelect();
  // visible.value = false;
});
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  bus.emit('drawerOpen', leftDrawerOpen.value);
};
const changeModulo = (contexSupport: IChatContextSupport) => {
  //console.log(contexSupport);
  bus.emit('enabledFooterControl', contexSupport, false);
};

const resetSelect = () => {
  model.value.id = 0;
  model.value.name = 'Seleccione el módulo';
  model.value.logo =
    'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';
};

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// };
</script>
<style scoped>
.q-toolbar .q-avatar {
  font-size: 30px;
}
</style>
