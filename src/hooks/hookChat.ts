import { ref } from 'vue';
import { ContextChat } from 'src/services/chatService';
import { IChatContextSupport } from 'src/types/chatModel';

const $contextChat = new ContextChat();
const responseChatGpt = ref<any>();
const resultContext = ref<IChatContextSupport[]>([]);
const resultParents = ref<IChatContextSupport[]>([]);
// const result = ref<IEntityContextSupport>();
const chatSetup = async (contextSupportModel: any) => {
  await $contextChat.chatSetup(contextSupportModel);
};

const Chat = async (contextSupportModel: any): Promise<any> => {
  const tmpResult = await $contextChat.chat(contextSupportModel);
  // console.log('-------------');
  // console.log(tmpResult);
  responseChatGpt.value = tmpResult;
  return tmpResult;
};

const getByParentId = async (parentId: number) => {
  const tmpResultContext = await $contextChat.GetByParentId(parentId);
  resultContext.value = [...tmpResultContext];
  return tmpResultContext;
};

const getByParents = async () => {
  const tmpResultParents = await $contextChat.GetByParents();
  resultParents.value = [...tmpResultParents];
  return tmpResultParents;
};

export default () => ({
  chatSetup,
  Chat,
  responseChatGpt,
  getByParentId,
  resultContext,
  getByParents,
  resultParents,
});
