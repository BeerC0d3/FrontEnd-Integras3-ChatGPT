<template>
  <q-page padding>
    <q-btn
      label="Ir a"
      color="primary"
      @click="scrollToBottom('747cd117-fcd3-4e85-8f45-b79e414eb9f0')"
    />
    <q-card
      flat
      bordered
      v-for="item in chatArray.chat"
      :key="item.guid"
      :id="item.guid"
    >
      <q-card-section>
        {{ item.question }}
      </q-card-section>
      <q-card-section>
        {{ answer }}
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { scrollToBottom } from '../../support/utils/scroll';
import { IChatModel, IChat } from '../../types/chatModel';
import * as Storage from 'src/support/utils/storage';
import useHookChat from '../../hooks/hookChat';

const { chatSetup, Chat, responseChatGpt } = useHookChat();
const chatArray = ref<IChat[]>([]);
const answer = ref(
  'Para XX cambiar la contraseña en el módulo Kiosco, sigue los siguientes pasos:\n\n1. Ingresa al módulo Kiosco con tu usuario y contraseña actual.\n2. Dirígete a la sección "Mi perfil".\n3. En la parte inferior de la página, encontrarás la opción "Cambiar contraseña", haz clic en ella.\n4. En la nueva página que se abra, deberás ingresar tu contraseña actual y la nueva contraseña que deseas usar.\n5. Confirma la nueva contraseña y haz clic en "Guardar cambios".\n\nListo, tu nueva contraseña ya ha sido actualizada. Es importante que recuerdes tu nueva contraseña para ingresar a la plataforma en el futuro.'
);

onMounted(async () => {
  const ele: HTMLElement | null = document.getElementById('q-layout');
  ele?.classList.remove('overflow-hidden');
  const body = document.body.getElementsByClassName('scroll')[0];
  body.classList.remove('scroll');

  chatArray.value = Storage.GetChatByContextSupportId();
  // console.log(chatArray.value.chat);
});
</script>
