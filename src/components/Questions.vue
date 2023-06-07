<template>
  <q-list separator>
    <q-item
      v-for="item in questions"
      :key="item.contextSupportId"
      clickable
      v-ripple
      to="/app/MyQuestion"
    >
      <q-item-section>
        <q-item-label
          class="text-blue-grey"
          @click="goQuestion(item.contextSupportId)"
          >{{ item.contextName }}</q-item-label
        >
        <!-- <q-item-label caption lines="2">{{ item.fecha }}</q-item-label> -->
      </q-item-section>

      <q-item-section side top>
        <q-icon color="negative" name="fa-solid fa-trash-can" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
import * as Storage from 'src/support/utils/storage';
import { IConversation } from 'src/types/chatModel';
import { onMounted, ref, inject } from 'vue';
import { scrollToBottom } from '../support/utils/scroll';
import { useChatStore } from 'src/stores/all';

// const questions = [
//   {
//     id: 1,
//     question: 'Como accesar al modulo',
//     fecha: '2023/04/24',
//   },
//   {
//     id: 3,
//     question: 'Como solicitar vacaciones',
//     fecha: '2023/04/22',
//   },
//   {
//     id: 4,
//     question: 'Como solicitar permisos',
//     fecha: '2023/04/24',
//   },
//   {
//     id: 5,
//     question: 'Como actualizo mis datos personales',
//     fecha: '2023/02/19',
//   },
//   {
//     id: 6,
//     question: 'Como actualizo mis datos personales',
//     fecha: '2023/02/19',
//   },
//   {
//     id: 7,
//     question: 'Como actualizo mis datos personales',
//     fecha: '2023/02/19',
//   },
//   {
//     id: 8,
//     question: 'Como actualizo mis datos personales',
//     fecha: '2023/02/19',
//   },
// ];
const bus = inject<any>('bus');
const questions = ref<IConversation[] | undefined>([]);
const $useChat = useChatStore();

onMounted(() => {
  questions.value = Storage.GetMyChat();
  // console.log(questions.value);
});
const goQuestion = (contextSupportId: number) => {
  $useChat.setChatStore(contextSupportId);
  bus.emit('goQuestion', contextSupportId);
};
</script>
