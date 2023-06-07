import { api } from 'src/boot/axios';
import {
  IContextSupport,
  IEntityContextSupport,
} from '../types/ContextSupport';

export class ContextSupport {
  constructor() {
    console.log('accesando a contextSupport');
  }

  async GetAll(): Promise<IContextSupport[]> {
    const { data } = await api.get('/api/ContextoSoporte/GetAll');

    return data;
  }
  async GetById(Id: number): Promise<IEntityContextSupport> {
    const { data } = await api.get(`/api/ContextoSoporte/GetById/${Id}`);

    return data;
  }
  async Update(contextSupport: IEntityContextSupport) {
    await api
      .post('/api/ContextoSoporte/Update/', contextSupport)
      .then(async (response) => {
        console.log('response');
      });
  }
}
