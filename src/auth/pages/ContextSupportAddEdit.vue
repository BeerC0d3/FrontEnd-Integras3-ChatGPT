<template>
  <q-page padding>
    <q-card class="q-ma-none">
      <q-card-section class="text-center text-h5">
        {{ support.name }}
      </q-card-section>
      <q-card-section>
        <q-form
          class="row q-col-gutter-md"
          @submit="submitForm"
          ref="formContext"
        >
          <q-input
            dense
            outlined
            v-model="support.name"
            label="Nombre"
            lazy-rules
            class="col-lg-12 col-xs-12"
            :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
          />

          <div class="col-lg-6 col-sm-12 col-xs-12">
            <q-file
              standout
              name="logoUrl"
              v-model="fileLogo"
              use-chips
              label="Selecciona una imagen"
              accept="image/*"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" class="icon-color" />
              </template>
              <template v-slot:append>
                <q-avatar>
                  <img :src="support?.logo" />
                </q-avatar>
              </template>
            </q-file>
          </div>
          <div class="col-lg-6 col-sm-12 col-xs-12">
            <q-file
              standout
              name="fileUrl"
              v-model="fileTxt"
              use-chips
              label="Selecciona el archivo del contexto"
              accept=".txt"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" class="icon-color" />
              </template>
              <template v-slot:append>
                <q-btn
                  :disable="support?.file == ''"
                  color="primary"
                  icon="cloud_download"
                  align="right"
                  @click="download"
                  class="btn-icon"
                />
              </template>
            </q-file>
          </div>

          <q-card-actions>
            <div class="col-12">
              <q-btn
                color="primary"
                label="Guardar"
                type="submit"
                align="right"
              ></q-btn>
            </div>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, inject } from 'vue';
import useHookContextSupport from '../hooks/hookContextSupport';
import { IEntityContextSupport } from '../types/ContextSupport';
import { useRouter, useRoute } from 'vue-router';
import { useCommonStore } from 'src/stores/all';
import { HandlSuccess } from 'src/support/handles/handleSuccess';
import { HandlError } from 'src/support/handles/handleError';

interface IFiles {
  nombreArchivo: string;
  archivoBase: string;
}

const fileLogo = ref<any>(null);
const fileTxt = ref<any>(null);
const formContext = ref<any>(null);
const pushFiles = ref<IFiles[]>([]);
const $route = useRoute();
const $router = useRouter();
const $commonStore = useCommonStore();
const { getById, result, Update } = useHookContextSupport();
const bus = inject<any>('bus');

const support = ref<IEntityContextSupport | undefined>({
  id: 0,
  name: '',
  logo: '',
  nameLogo: '',
  file: '',
  nameFile: '',
});

// onBeforeMount(async () => {
//   console.log('onBeforeMount');
//   const Id: string | undefined = $route.query.Id?.toString();
//   if (typeof Id === 'string') await Get(parseInt(Id));
//   support.value = result.value;
// });

onMounted(async () => {
  console.log('onMounted');
  const Id: string | undefined = $route.query.Id?.toString();
  if (typeof Id === 'string') await Get(parseInt(Id));
  support.value = result.value;
});

bus.on('setContextSupport', async (Id: number) => {
  await Get(Id);
});
const Get = async (Id: number) => {
  await getById(Id);
  support.value = result.value;
};
const GetByQuery = async () => {
  const Id: string | undefined = $route.query.Id?.toString();
  if (typeof Id === 'string') await Get(parseInt(Id));
  support.value = result.value;
};
const download = () => {
  console.log('click download');
};
const submitForm = async (evt: any) => {
  formContext.value.validate().then(async (success: any) => {
    if (success) {
      await pushBase64(evt);
      // console.log(pushFiles.value[0].nombreArchivo);
      // console.log(pushFiles.value[1].nombreArchivo);

      support.value.logo = pushFiles.value[0].archivoBase;
      support.value.nameLogo = pushFiles.value[0].nombreArchivo;
      support.value.file = pushFiles.value[1].archivoBase;
      support.value.nameFile = pushFiles.value[1].nombreArchivo;
      await SendUpdate();
      pushFiles.value = [];
    }
  });
};
const SendUpdate = async () => {
  try {
    $commonStore.Add_Request();
    await Update(support.value);
    await GetByQuery();
    bus.emit('refreshContextSupport');
    HandlSuccess('Guardado exitosamente');
  } catch (error: any) {
    $commonStore.Remove_Request();
    HandlError(error);
  }
};

const pushBase64 = async (evt: any) => {
  const formData = new FormData(evt.target);
  for (const [name, file] of formData.entries()) {
    pushFiles.value.push({
      nombreArchivo: file.name,
      archivoBase: await readFile(file),
    });
    //return await readFile(file);
  }
};
const readFile = (file: any) => {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader();

    reader.onload = (e) =>
      resolve(e.target.result.replace('data:', '').replace(/^.+,/, ''));
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
</script>
<style scoped>
.btn-icon i {
  margin: 10px;
}
.icon-color {
  color: #10a37f;
}
</style>
