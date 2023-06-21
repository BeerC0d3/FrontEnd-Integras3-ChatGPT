import { ref } from 'vue';
import { IChat, IConversation } from 'src/types/chatModel';
import { uid as genUID } from 'quasar';
import { useChatStore } from 'src/stores/all';
import { as } from 'app/dist/spa/assets/index.fb3b7248';

const $useChat = useChatStore();

const modelConversation = ref<IConversation[]>([]);
export const SaveStorage = (Conversation: IConversation) => {
  if (!ExistContextSupportId(Conversation.contextSupportId)) {
    //const uid = genUID();
    modelConversation.value.push({
      uuid: Conversation.uuid,
      contextName: Conversation.contextName,
      contextSupportParentId: Conversation.contextSupportParentId,
      contextSupportId: Conversation.contextSupportId,
      chat: [],
    });

    Insert(modelConversation.value);
  }
};
export const UpdateStorage = (modelConversation: IConversation) => {
  console.log('UpdateStorage');
  //localStorage.setItem('chat', JSON.stringify(modelConversation));
};

export const GetAllStorage = () => {
  console.log('GetAllStorage');
};

export const GetChatByContextSupportId = () => {
  const storageChat = localStorage.getItem('chat');
  //console.log(storageChat);
  //  const Conversation: IConversation = null;
  if (storageChat) {
    const parseStorage = JSON.parse(storageChat) as IConversation[];
    const Conversation = parseStorage.find(
      (item) => item.contextSupportId === $useChat.geContextSupportId
    );

    return Conversation;
  }

  //return Conversation;
};
export const GetMyChat = () => {
  const storageChat = localStorage.getItem('chat');
  if (storageChat) {
    const parseStorage = JSON.parse(storageChat) as IConversation[];
    return parseStorage;
  }
};

export const ExistContextSupportId = (contextSupportId: number): boolean => {
  //console.log('contextSupportId: ' + contextSupportId);
  const storageChat = localStorage.getItem('chat');

  if (storageChat) {
    const parseStorage = JSON.parse(storageChat) as IConversation[];
    console.log('ExistContextSupportId');
    console.log(parseStorage);
    const list = parseStorage.find(
      (item) => item.contextSupportId === contextSupportId
    );

    if (list) return true;

    // if (parseStorage.contextSupportId == contextSupportId) return true;
  }

  return false;
};

export const Insert = (modelConversation: IConversation[]) => {
  const contextArray = [];
  const storageChat = localStorage.getItem('chat');
  //console.log(storageChat);
  if (storageChat) {
    //  const parseStorage = JSON.parse(storageChat) as IConversation[];
    const contextArray = JSON.parse(storageChat);
    contextArray.push(modelConversation[0]);
    // contextArray.push(parseStorage);
    //contextArray.push(modelConversation[0]);
    // let parseStorage = JSON.parse(storageChat);
    //parseStorage = [...parseStorage, modelConversation];
    //console.log(parseStorage);
    // contextArray.push(parseStorage);
    // contextArray.push(modelConversation);
    // localStorage.removeItem('chat');
    //storageChat.push()
    localStorage.setItem('chat', JSON.stringify(contextArray));
  } else {
    // contextArray.push(modelConversation[0]);
    localStorage.setItem('chat', JSON.stringify(modelConversation));
  }
};
export const AddQuestion = (chat: IChat) => {
  const storageChat = localStorage.getItem('chat');
  if (storageChat) {
    const parseStorage = JSON.parse(storageChat) as IConversation[];
    for (const item of parseStorage) {
      if (item.contextSupportId == $useChat.geContextSupportId) {
        item.chat.push(chat);
        localStorage.setItem('chat', JSON.stringify(parseStorage));
        //console.log(parseStorage);
      }
    }
  }
};
export const UpdateQuestion = (chat: IChat, answer: string) => {
  const storageChat = localStorage.getItem('chat');
  if (storageChat) {
    const parseStorage = JSON.parse(storageChat) as IConversation[];
    for (const item of parseStorage) {
      for (const itemChat of item.chat) {
        if (itemChat.guid == chat.guid) {
          itemChat.answer = answer;
          localStorage.setItem('chat', JSON.stringify(parseStorage));
          // console.log(parseStorage);
        }
      }
    }
  }
};
export const Update = (modelConversation: IConversation) => {
  const storageChat = localStorage.getItem('chat');

  if (storageChat) {
    const parseStorage = JSON.parse(storageChat) as IConversation[];
    // for (const i = 0; i < parseStorage.length; i++) {
    //   if (
    //     parseStorage[i].contextSupportId == modelConversation.contextSupportId
    //   ) {
    //     parseStorage[i] = modelConversation;
    //     //item.chat.push
    //     //item = modelConversation;
    //     // localStorage.removeItem('chat');
    //     //localStorage.setItem('chat', JSON.stringify(storageChat));
    //   }
    // }
    // for (const item of parseStorage) {
    //   console.log(item);
    // }

    // });
    //console.log(parseStorage);
    // const list = parseStorage.find(
    //   (item) => item.contextSupportId === $useChat.geContextSupportId
    // );
    // console.log('----------');
    // console.log(list);
  }
};
