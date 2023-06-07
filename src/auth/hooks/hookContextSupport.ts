import { ref } from 'vue';
import { ContextSupport } from '../services/ContextSupportService';
import {
  IContextSupport,
  IEntityContextSupport,
} from '../types/ContextSupport';

const $contextSupportService = new ContextSupport();
const listContext = ref<IContextSupport[]>([]);
const result = ref<IEntityContextSupport>();

const getAll = async () => {
  const tmpListContext = await $contextSupportService.GetAll();
  // console.log(tmpListContext);
  listContext.value = [...tmpListContext];
  return tmpListContext;
};
const getById = async (Id: number) => {
  const tmpResult = await $contextSupportService.GetById(Id);
  result.value = tmpResult as IEntityContextSupport;

  console.log(result.value);

  return tmpResult;
};

const Update = async (contextSupportModel: IEntityContextSupport) => {
  await $contextSupportService.Update(contextSupportModel);
};

export default () => ({
  getAll,
  listContext,
  result,
  getById,
  Update,
});
