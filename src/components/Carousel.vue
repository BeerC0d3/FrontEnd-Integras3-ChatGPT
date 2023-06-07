<template>
  <q-carousel
    v-model="slide"
    vertical
    transition-prev="slide-down"
    transition-next="slide-up"
    swipeable
    animated
    control-color="white"
    navigation-icon="radio_button_unchecked"
    navigation
    padding
    arrows
    infinite
    :autoplay="autoplay"
    height="160px"
    class="bg-blue-6 text-white shadow-1 rounded-borders"
    style="width: 290px; cursor: pointer"
  >
    <q-carousel-slide
      v-for="item in contextSupport"
      :key="item.id"
      :name="item.id"
      class="column no-wrap flex-center"
      @click="clickSlide(item.id)"
    >
      <img :src="item.logo" />
      <div class="q-mt-md text-center">
        {{ item.name }}
      </div>
    </q-carousel-slide>

    <!-- <q-carousel-slide name="tv" class="column no-wrap flex-center">
      <q-icon name="live_tv" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide> -->
  </q-carousel>
</template>
<script setup lang="ts">
import { IChatContextSupport } from 'src/types/chatModel';
import { ref, onBeforeMount, inject } from 'vue';
import { useChatStore } from 'src/stores/all';

const bus = inject<any>('bus');
const slide = ref('style');
const autoplay = ref(true);
const $useChat = useChatStore();
//const result = ref<IChatContextSupport[]>([]);

export interface Props {
  contextSupport: IChatContextSupport[];
}

const props = withDefaults(defineProps<Props>(), {
  contextSupport: () => [],
});
const clickSlide = (contextSuppId: number) => {
  $useChat.setChatContextParent(contextSuppId);
  bus.emit('refreshSelectModulo');
};

// onBeforeMount(async () => {
//   await getByParents();
//   result.value = resultParents.value;

//   //console.log(result.value);
// });

// const descIntegra = ref('Encontraras manuales de todos los modulos integrados');
// const lorem = ref(
//   'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
// );
</script>
