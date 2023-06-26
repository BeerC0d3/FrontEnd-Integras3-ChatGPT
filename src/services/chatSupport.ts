import { ref, inject } from 'vue';
import { uid as genUID } from 'quasar';
import {
  IChatContextSupport,
  IChatModel,
  IConversation,
} from 'src/types/chatModel';
import useHookChat from '../hooks/hookChat';
import { useChatStore } from 'src/stores/all';
import * as Storage from 'src/support/utils/storage';
const { chatSetup } = useHookChat();

// const selectContextSupport = ref<IChatContextSupport[]>([]);
// const { resultContext, getByParentId } = useHookChat();

const modelChatSetup = ref<IChatModel>({
  contextId: 0,
  conversationId: '',
  message: '',
  contextFile: '',
});
const $useChat = useChatStore();

export const GetSelectContestSupportHtml = (
  result: IChatContextSupport[]
): string => {
  let messageHtml: string;
  messageHtml = '';
  messageHtml +=
    'Hola. bienvenid@, para poder ayudarte selecciona uno de nuestros modulos. <br>';
  messageHtml += '<div class="q-list q-list--bordered rounded-borders">';
  for (const item of result) {
    messageHtml +=
      '<div class="q-expansion-item__container relative-position btnItem"  id=item-' +
      item.id +
      '" data-supportid="' +
      item.id +
      '" data-supportname="' +
      item.name +
      '" style="background-color: #fff;color:#c95454;">';
    messageHtml +=
      '<div class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable">';
    messageHtml +=
      '<div class="q-item__section column q-item__section--side justify-center q-item__section--avatar">';
    messageHtml +=
      '<div class="q-avatar bg-primary text-white q-chip--colored">';
    messageHtml +=
      '<div class="q-avatar__content row flex-center overflow-hidden">';
    messageHtml += '<img src=' + item.logo + ' />';
    messageHtml += '</div></div></div>';

    messageHtml +=
      '<div class="q-item__section column q-item__section--main justify-center">';
    messageHtml += item.name;
    messageHtml += '</div></div></div>';
    messageHtml +=
      '<hr class="q-separator q-separator--horizontal" aria-orientation="horizontal">';
  }

  messageHtml += '</div>';

  return messageHtml;
};

export const addEventClick = () => {
  const btns = document.getElementsByClassName('btnItem');
  //console.log(btns);
  Array.prototype.forEach.call(btns, function (el) {
    el.addEventListener('click', async function (e: any) {
      e.preventDefault();
      const contexSupport: IChatContextSupport = {
        id: this.dataset.supportid,
        name: this.dataset.supportname,
        logo: '',
      };
      const guid = genUID();
      modelChatSetup.value.conversationId = guid;
      modelChatSetup.value.contextId = this.dataset.supportid;
      modelChatSetup.value.message =
        this.dataset.supportid == 4
          ? 'kiosko es un modulo de integras3'
          : 'Estructura Organizacional del sistema Integra S3';
      $useChat.setChatStore(this.dataset.supportid);
      $useChat.setConversationId(guid);
      await chatSetup(modelChatSetup.value);
      setModelConversation(contexSupport, guid);
    });
  });
};

const setModelConversation = (
  contexSupport: IChatContextSupport,
  guidConversation: string
) => {
  if (!Storage.ExistContextSupportId(contexSupport.id)) {
    const modelConversation = ref<IConversation[]>([]);
    //const uid = genUID();
    modelConversation.value.push({
      uuid: guidConversation,
      contextName: contexSupport.name,
      contextSupportParentId: $useChat.getContextSupportParentId,
      contextSupportId: contexSupport.id,
      chat: [],
    });

    Storage.Insert(modelConversation.value);
  }
};
