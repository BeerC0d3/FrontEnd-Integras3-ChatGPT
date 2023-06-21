<template>
  <q-footer>
    <div class="q-pa-sm no-wrap items-center bg-grey-3 text-black">
      <div class="text-grey-8" :style="styleWriting">
        <img
          class=""
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
          style="width: 30px"
        />
        escribiendo <q-spinner-dots size="2rem" />
      </div>
      <div class="row">
        <q-input
          rounded
          outlined
          dense
          class="col-grow q-mr-sm"
          bg-color="white"
          v-model="message"
          placeholder="Escriba su pregunta"
          :disable="disableTextQuestion"
          @keyup.enter="enterQuestion"
        />
        <q-btn
          round
          color="primary"
          flat
          size="20px"
          icon="send"
          :style="styleButtom"
          @click="enterQuestion"
          style="top: -0px; position: relative"
        />
      </div>
    </div>
  </q-footer>
</template>
<script setup lang="ts">
import {
  IChat,
  IChatModel,
  IChatContextSupport,
  IConversation,
} from 'src/types/chatModel';
import { ref, inject, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as Storage from 'src/support/utils/storage';
import { useChatStore } from 'src/stores/all';
import { uid as genUID } from 'quasar';
import useHookChat from '../hooks/hookChat';
import { store } from 'quasar/wrappers';
// const { chatSetup, Chat, responseChatGpt } = useHookChat();

const $router = useRouter();
const $route = useRoute();
const $useChat = useChatStore();
const visibleWriting = ref(false);

const styleWriting = computed(() => ({
  display: visibleWriting.value ? 'block' : 'none',
}));
// const modelChatSetup = ref<IChatModel>({
//   contextId: 0,
//   conversationId: '1fa84f61-5717-4562-b3fc-2c963f66afa5',
//   message:
//     'kiosko es un modulo de integras3 para solicitar vacaciones, permisos y ver tu información personal',
//   contextFile: '',
// });

const bus = inject<any>('bus');
const message = ref('');
// const modelConversation = ref<IConversation>({
//   uuid: '',
//   contextSupportId: 0,
//   chat: [],
// });

const modelContextSupport = ref<IChatContextSupport>();
const disableTextQuestion = ref(false);
const disableButtonConversation = ref(true);
const visibleButtonConversation = ref(false);

const styleButtom = computed(() => ({
  visibility: visibleButtonConversation.value ? 'visible' : 'hidden',
}));

watch(
  () => message.value,
  (newVal) => {
    if (newVal.length > 0) visibleButtonConversation.value = true;
    else visibleButtonConversation.value = false;
  }
);

const enterQuestion = async () => {
  const newChat: IChat = {
    guid: genUID(),
    conversationId: 0,
    question: message.value,
    answer: '',
  };
  Storage.AddQuestion(newChat);
  bus.emit('refreshChat', newChat);
  message.value = '';

  // modelChatSetup.value.message = message.value;
  // await Chat(modelChatSetup.value);
  // Storage.UpdateQuestion(newChat, responseChatGpt.value);
  // bus.emit('refreshChat', 'Answer');
};
bus.on(
  'enabledFooterControl',
  (contexSupport: IChatContextSupport, isEnabled: boolean) => {
    disableButtonConversation.value = isEnabled;
    // setModelConversation(contexSupport);
    //$useChat.setChatStore(contexSupport.id);
  }
);

bus.on('visibleWriting', (isVisible: boolean) => {
  visibleWriting.value = isVisible;
});

// const addConversation = () => {
//   disableTextQuestion.value = false;
//   setModelConversation();
//   $router.push('/app/MyQuestion');
//   disableButtonConversation.value = true;
// };

const setModelConversation = async (contexSupport: IChatContextSupport) => {
  if (!Storage.ExistContextSupportId(contexSupport.id)) {
    const modelConversation = ref<IConversation[]>([]);
    const uid = genUID();
    modelConversation.value.push({
      uuid: uid,
      contextName: contexSupport.name,
      contextSupportParentId: $useChat.getContextSupportParentId,
      contextSupportId: contexSupport.id,
      chat: [],
    });

    //  console.log('setModelConversation');
    Storage.Insert(modelConversation.value);

    disableButtonConversation.value = true;
  }

  // $router.push('/app/MyQuestion');
  // Storage.SaveStorage(modelContextSupport.value.id);
  // modelChatSetup.value.contextId = modelContextSupport.value.id;
  //await chatSetup(modelChatSetup.value);
  // console.log;
};
</script>
