<template>
  <q-page padding>
    <!-- <q-chat-message
      avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
      text-color="white"
      bg-color="primary"
      ><q-spinner-dots size="2rem" />
    </q-chat-message> -->
    <q-chat-message
      name="gpt"
      avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
      :text="[textWelcome]"
      text-html
      stamp="4 minutes ago"
      text-color="white"
      bg-color="primary"
    />
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
        avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
        :text="[item.answer]"
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
  </q-page>
  <!-- <context-support ref="contextSupport" /> -->
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, inject, computed } from 'vue';
import * as supportHtml from '../../services/chatSupport';
import { IChatModel, IChat } from '../../types/chatModel';
import useHookChat from '../../hooks/hookChat';
import { useChatStore } from 'src/stores/all';
import * as Storage from 'src/support/utils/storage';
import { scrollToBottom } from '../../support/utils/scroll';

const bus = inject<any>('bus');
const { resultContext, Chat, responseChatGpt, getByParentId } = useHookChat();
const $useChat = useChatStore();
const textWelcome = ref('');
const chatArray = ref<IChat[]>([]);
const modelChat = ref<IChatModel>({
  contextId: $useChat.geContextSupportId,
  conversationId: $useChat.getConversationId,
  message: '',
  contextFile: '',
});
const answer = ref(
  'Para solicitar vacaciones debes seguir los siguientes pasos:\n\n1. Ingresa al Kiosco de RRHH con tus credenciales de usuario y contraseña.\n2. En el menú del lado izquierdo, selecciona la opción "Vacaciones y Permisos".\n3. Selecciona la opción "Solicitud de Vacaciones".\n4. Selecciona el periodo de vacaciones que deseas tomar y las fechas de inicio y fin de las mismas.\n5. Ingresa una breve descripción del motivo por el que solicitas las vacaciones.\n6. Da clic en el botón "Enviar Solicitud".\n\nTu solicitud será enviada a tu jefe inmediato para su autorización. Una vez que este la apruebe o rechace, recibirás una notificación en tu correo electrónico y podrás consultar el estatus de tu solicitud en la sección correspondiente del Kiosco.'
);
const visibleMessage = ref(true);
const visibleWriting = ref(false);

const styleMessagge = computed(() => ({
  display: visibleMessage.value ? 'block' : 'none',
}));
const styleWriting = computed(() => ({
  display: visibleWriting.value ? 'block' : 'none',
}));

onBeforeMount(async () => {
  await getByParentId($useChat.getContextSupportParentId);
  const resultHtml = supportHtml.GetSelectContestSupportHtml(
    resultContext.value
  );

  textWelcome.value = resultHtml;
});

onMounted(() => {
  console.log('onMounted');
  chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];
  setTimeout(() => {
    supportHtml.addEventClick();
  }, 800);
});
bus.on('refreshChat', async (chat: IChat) => {
  chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];

  (modelChat.value.contextId = $useChat.geContextSupportId),
    (modelChat.value.conversationId = $useChat.getConversationId),
    (modelChat.value.message = chat.question);

  //await Chat(modelChat.value);
  visibleWriting.value = true;
  visibleMessage.value = false;
  //Storage.UpdateQuestion(chat, answer.value);
  setTimeout(() => {
    // Storage.UpdateQuestion(chat, responseChatGpt.value);
    const answerReplaced = replaceAnswer(answer.value);
    // console.log(answerReplaced);
    Storage.UpdateQuestion(chat, answerReplaced);
    chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];
    visibleWriting.value = false;
    visibleMessage.value = true;
    //scrollToBottom(chat.guid);
  }, 500);

  // chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];
  // visibleWriting.value = false;
  // visibleMessage.value = true;

  setTimeout(() => {
    scrollToBottom(chat.guid);
  }, 500);
});
const replaceAnswer = (answer: string): string => {
  const splitLines = answer.split('\n');
  //answer.value += answer.value.replace('\n', '<br/>');
  // let resp =
  //   'Para solicitar vacaciones debes seguir los siguientes pasos:\n\n1. Ingresa al Kiosco de RRHH con tus credenciales de usuario y contraseña.\n2. En el menú del lado izquierdo, selecciona la opción "Vacaciones y Permisos".\n3. Selecciona la opción "Solicitud de Vacaciones".\n4. Selecciona el periodo de vacaciones que deseas tomar y las fechas de inicio y fin de las mismas.\n5. Ingresa una breve descripción del motivo por el que solicitas las vacaciones.\n6. Da clic en el botón "Enviar Solicitud".\n\nTu solicitud será enviada a tu jefe inmediato para su autorización. Una vez que este la apruebe o rechace, recibirás una notificación en tu correo electrónico y podrás consultar el estatus de tu solicitud en la sección correspondiente del Kiosco.';
  // let replaced = resp.replace('\n', '<br />');
  //console.log(answer);
  Array.prototype.forEach.call(splitLines, function (el) {
    answer = answer.replace('\n', '<br />');
  });

  return answer;
};
</script>
