import { api } from 'src/boot/axios';
import { IChatContextSupport } from 'src/types/chatModel';
export class ContextChat {
  constructor() {
    console.log('accesando a contextChat');
  }

  async chatSetup(contextChat: any) {
    await api
      .post('/api/ContextoSoporte/ChatSetup/', contextChat)
      .then(async (response) => {
        console.log('saveSetup');
      });
  }
  async chat(contextChat: any): Promise<any> {
    const { data } = await api.post('/api/ContextoSoporte/Chat/', contextChat);

    return data.choices[0].message.content;
    // await api
    //   .post('/api/ContextoSoporte/Chat/', contextChat)
    //   .then(async (response) => {
    //     return response.data.choices[0].message.content;
    //     //console.log(response.data.choices[0].message.content);
    //   });
  }
  async GetByParentId(parentId: number): Promise<IChatContextSupport> {
    const { data } = await api.get(
      `/api/ContextoSoporte/GetByParentId/${parentId}`
    );

    return data;
  }
  async GetByParents(): Promise<IChatContextSupport> {
    const { data } = await api.get('/api/ContextoSoporte/GetParents');

    return data;
  }
}
