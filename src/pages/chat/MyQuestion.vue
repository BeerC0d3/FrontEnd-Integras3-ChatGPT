<template>
  <q-page ref="pageChat" padding>
    <!-- <q-btn
      label="Ir a"
      color="primary"
      @click="scrollToBottom('747cd117-fcd3-4e85-8f45-b79e414eb9f0')"
    /> -->

    <div v-for="item in chatArray" :key="item.guid">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="[item.question]"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />

      <q-chat-message
        name="gpt"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[replaceAnswer()]"
        text-html
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
        :id="item.guid"
        :style="styleMessagge"
      />
      <q-chat-message
        avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
        text-color="white"
        bg-color="primary"
        :style="styleWriting"
        ><q-spinner-dots size="2rem" />
      </q-chat-message>

      <div :message="item.guid" style="display: block; height: 50px"></div>
    </div>
    <!-- <transition appear @before-enter="beforeEnter" @enter="enter"> -->
    <!-- <q-chat-message
      name="me"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="[item.question]"
      stamp="7 minutes ago"
      sent
      bg-color="amber-7"
    /> -->
    <!-- <q-chat-message
      v-for="item in chatArray.items"
      :key="item.guid"
      :name="'me'"
      :text="[answer]"
      :sent="item.question == 'me' ? true : false"
      :bg-color="'light-green-2'"
      :id="item.guid"
    /> -->
    <!-- <div style="height: 500px; overflow: auto"> -->
    <!-- <q-card
      flat
      bordered
      v-for="item in chatArray.chat"
      :key="item.guid"
      :id="item.guid"
    >
      <q-card-section>
        {{ item.question }}
      </q-card-section>
      <q-card-section>
        {{ answer }}
      </q-card-section>
    </q-card> -->
    <!-- </div> -->
    <!-- <q-chat-message
      name="chatGPT"
      name-html
      avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
      :text="[answer]"
      text-html
      size="10"
      text-color="white"
      bg-color="primary"
      :style="styleMessagge"
      :id="item.guid"
    /> -->

    <!-- <q-chat-message
        avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
        text-color="white"
        bg-color="primary"
        :style="styleWriting"
        ><q-spinner-dots size="2rem" />
      </q-chat-message> -->
    <!-- </transition> -->
    <!-- </div> -->
    <!-- </q-scroll-area> -->
    <!-- <transition appear @before-enter="beforeEnter" @enter="enter">
      <h1>Mi chat</h1>
    </transition> -->
  </q-page>
  <!-- </div> -->
</template>
<script setup lang="ts">
import { commonStore } from 'src/common/stores/store-common';
import { useQuasar } from 'quasar';
import {
  ref,
  onBeforeMount,
  onMounted,
  inject,
  reactive,
  computed,
  watch,
} from 'vue';
import useHookChat from '../../hooks/hookChat';
import { IChatModel, IChat } from '../../types/chatModel';
import * as Storage from 'src/support/utils/storage';
import { scrollToBottom } from '../../support/utils/scroll';
import { useChatStore } from 'src/stores/all';
import { useRouter } from 'vue-router';

const { chatSetup, Chat, responseChatGpt } = useHookChat();
const chatArray = ref<IChat[]>([]);
const $q = useQuasar();
const $useChat = useChatStore();
const $router = useRouter();
//const chatArray = reactive<{ items: IChat[] }>({ items: [] });
const answer = ref(
  'Para XX cambiar la contraseña en el módulo Kiosco, sigue los siguientes pasos:\n\n1. Ingresa al módulo Kiosco con tu usuario y contraseña actual.\n2. Dirígete a la sección "Mi perfil".\n3. En la parte inferior de la página, encontrarás la opción "Cambiar contraseña", haz clic en ella.\n4. En la nueva página que se abra, deberás ingresar tu contraseña actual y la nueva contraseña que deseas usar.\n5. Confirma la nueva contraseña y haz clic en "Guardar cambios".\n\nListo, tu nueva contraseña ya ha sido actualizada. Es importante que recuerdes tu nueva contraseña para ingresar a la plataforma en el futuro.'
);
const model = ref<IChatModel>({
  contextId: 4,
  conversationId: '1fa84f61-5717-4562-b3fc-2c963f66afa5',
  message: '',
  contextFile: '',
});
const bus = inject<any>('bus');
const visibleMessage = ref(true);
const visibleWriting = ref(false);
const pageChat = ref<HTMLElement | null>(null);
const messageLoading = ref<HTMLElement | null>(null);
const itemChat = ref(null);
const style = computed(() => ({
  height: $q.screen.height + 'px',
}));

const replaceAnswer = (): string => {
  //answer.value += answer.value.replace('\n', '<br/>');
  return (answer.value = answer.value.replace('\n', '<br/>'));
};

const styleMessagge = computed(() => ({
  display: visibleMessage.value ? 'block' : 'none',
}));
const styleWriting = computed(() => ({
  display: visibleWriting.value ? 'block' : 'none',
}));

// bus.on('refreshChat', async (chat: IChat) => {
//   chatArray.value = Storage.GetChatByContextSupportId()?.chat;
//   model.value.message = chat.question;
//   //await Chat(model.value);
//   visibleWriting.value = true;
//   visibleMessage.value = false;

//   // setTimeout(() => {
//   //   Storage.UpdateQuestion(chat, responseChatGpt.value);
//   // }, 800);

//   chatArray.value = Storage.GetChatByContextSupportId()?.chat;
//   visibleWriting.value = false;
//   visibleMessage.value = true;

//   setTimeout(() => {
//     scrollToBottom(chat.guid);
//   }, 200);
// });

bus.on('goQuestion', (guidAnswer: string) => {
  console.log(guidAnswer);
  scrollToBottom(guidAnswer);
});

onMounted(async () => {
  // chatArray.value.items = Storage.GetChatByContextSupportId();
  if ($useChat.geContextSupportId == 0) {
    $router.push('/app');
  } else {
    chatArray.value = Storage.GetChatByContextSupportId()?.chat;
  }

  //const ele: HTMLElement | null = document.getElementById('q-layout');
  // ele?.classList.remove('overflow-hidden');
  // const body = document.body.getElementsByClassName('scroll')[0];
  // body.classList.remove('scroll');
});
</script>
<style scoped>
.scroll-content {
  height: calc(100% - 170px);
  margin-top: 170px;
}
</style>
