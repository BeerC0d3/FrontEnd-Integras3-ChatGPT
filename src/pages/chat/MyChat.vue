<template>
  <q-page padding>
    <q-chat-message
      name="gpt"
      avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
      :text="[textWelcome]"
      text-html
      text-color="white"
      bg-color="primary"
    />

    <div v-for="item in chatArray" :key="item.guid">
      <q-chat-message
        name="Integra"
        avatar="https://firebasestorage.googleapis.com/v0/b/beerc0d3-storage.appspot.com/o/Logos%2FlogoIntegra.PNG?alt=media&token=8baedde1-a068-417e-9d2b-9963776d8087&_gl=1*1y021y4*_ga*MTIxNzMxODA5Ni4xNjY2MTA3NTUy*_ga_CW55HF8NVT*MTY4NjY5ODE0MS4xOC4wLjE2ODY2OTgxNDEuMC4wLjA."
        :text="[item.question]"
        sent
        bg-color="amber-7"
      />

      <q-chat-message
        name="gpt"
        avatar="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
        :text="[item.answer]"
        text-html
        text-color="white"
        bg-color="primary"
        :id="'gpt_' + item.guid"
        :style="styleMessagge"
      />

      <div :message="item.guid" style="display: block; height: 65px"></div>
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
import { scrollToBottom, scrollToWriting } from '../../support/utils/scroll';

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
  'Local-Para solicitar vacaciones debes seguir los siguientes pasos:\n\n1. Ingresa al Kiosco de RRHH con tus credenciales de usuario y contraseña.\n2. En el menú del lado izquierdo, selecciona la opción "Vacaciones y Permisos".\n3. Selecciona la opción "Solicitud de Vacaciones".\n4. Selecciona el periodo de vacaciones que deseas tomar y las fechas de inicio y fin de las mismas.\n5. Ingresa una breve descripción del motivo por el que solicitas las vacaciones.\n6. Da clic en el botón "Enviar Solicitud".\n\nTu solicitud será enviada a tu jefe inmediato para su autorización. Una vez que este la apruebe o rechace, recibirás una notificación en tu correo electrónico y podrás consultar el estatus de tu solicitud en la sección correspondiente del Kiosco.'
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
  chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];
  setTimeout(() => {
    supportHtml.addEventClick();
  }, 800);
});
bus.on('refreshChat', async (chat: IChat) => {
  chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];

  setTimeout(() => {
    scrollToBottom(chat.guid);
    hideAnswer(chat.guid, 'none');
  }, 300);

  (modelChat.value.contextId = $useChat.geContextSupportId),
    (modelChat.value.conversationId = $useChat.getConversationId),
    (modelChat.value.message = chat.question);

  executeBus(true);
  await Chat(modelChat.value);

  setTimeout(() => {
    //  Storage.UpdateQuestion(chat, responseChatGpt.value);
    //const answerReplaced = replaceAnswer(answer.value);
    const answerReplaced = replaceAnswer(responseChatGpt.value);
    // console.log(answerReplaced);
    Storage.UpdateQuestion(chat, answerReplaced);
    chatArray.value = Storage.GetChatByContextSupportId()?.chat as IChat[];
    executeBus(false);
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
const executeBus = (showingWriting: boolean) => {
  bus.emit('visibleWriting', showingWriting);
};
const hideAnswer = (guidQuestion: string, display: string) => {
  (
    document.getElementById('gpt_' + guidQuestion) as HTMLElement
  ).style.display = display;
};
</script>
