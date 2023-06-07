export interface IChatModel {
  conversationId: string;
  message: string;
  contextId: number;
  contextFile: string;
}

export interface IChat {
  guid: string;
  conversationId: number;
  question: string;
  answer: string;
}

export interface IChatContextSupport {
  id: number;
  name: string;
  logo: string;
}
export interface IConversation {
  uuid: string | undefined;
  contextName: string;
  contextSupportParentId: number;
  contextSupportId: number;
  chat: IChat[];
}
