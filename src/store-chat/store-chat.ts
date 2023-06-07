import { defineStore } from 'pinia';
interface chatState {
  contextSupportId: number;
  contextSupportParentId: number;
  conversationId: string;
}

export const useChatStore = defineStore('chat', {
  state: (): chatState => ({
    contextSupportId: 0,
    contextSupportParentId: 2,
    conversationId: '',
  }),
  getters: {
    geContextSupportId: (state) => state.contextSupportId,
    getContextSupportParentId: (state) => state.contextSupportParentId,
    getConversationId: (state) => state.conversationId,
  },
  actions: {
    setChatStore(contextSupportId: number) {
      this.contextSupportId = contextSupportId;
    },
    setChatContextParent(contextSupportParentId: number) {
      this.contextSupportParentId = contextSupportParentId;
    },
    setConversationId(conversationId: string) {
      this.conversationId = conversationId;
    },
  },
});
