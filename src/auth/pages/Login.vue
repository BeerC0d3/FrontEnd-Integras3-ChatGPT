<template>
  <q-page class="fit row wrap justify-center items-center content-center">
    <div
      class="col-4 col-xs-12 col-sm-4 col-lg-4 col-md-4 q-pl-xs q-pr-xs self-center"
    >
      <q-card class="q-ma-none" flat bordered>
        <div class="text-center">
          <q-img
            src="~assets/gpt-integra3.png"
            spinner-color="white"
            class="rounded-borders"
            style="max-width: 300px"
          ></q-img>
        </div>
        <p class="text-weight-bolder text-center text-grey">
          Accesar al sistema
        </p>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="doLogin">
            <q-input
              outlined
              clearable
              v-model="user.username"
              label="Email"
              type="email"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input
              outlined
              clearable
              v-model="user.password"
              label="Password"
              type="password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
            </q-input>

            <q-card-actions>
              <div class="row full-width items-center">
                <div class="col-12">
                  <q-btn
                    rounded
                    size="md"
                    class="full-width"
                    color="primary"
                    label="Accesar"
                    type="submit"
                  ></q-btn>
                </div>
              </div>
            </q-card-actions>
            <q-card-section>
              <p
                class="text-caption text-weight-light text-grey box-buttons"
              ></p>
            </q-card-section>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ILogin } from '../types/Login';
import { useCommonStore, useUserStore } from 'src/stores/all';
import { HandlError } from 'src/support/handles/handleError';

const user = reactive<ILogin>({
  username: '',
  password: '',
});

const $commonStore = useCommonStore();
const $authStore = useUserStore();
const $router = useRouter();
const $route = useRoute();

const doLogin = async () => {
  try {
    $commonStore.Add_Request();
    await $authStore.Login(user);
    const to = $route.query.to?.toString();
    $router.push(to || '/admin/dashboard');
  } catch (error: any) {
    $commonStore.Remove_Request();
    HandlError(error);
  }
};
// onMounted(() => {
//   $commonStore.Add_Request();
// });
</script>
