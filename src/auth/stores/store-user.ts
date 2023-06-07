import { defineStore } from 'pinia';
import { ILogin } from 'src/auth/types/Login';
import * as storage from 'src/auth/storage';
import { api } from 'boot/axios';

interface UserState {
  user: object;
  authenticated: boolean;
  token: string;
}

export const useUserStore = defineStore('auth', {
  state: (): UserState => ({
    user: {},
    authenticated: false,
    token: '',
  }),
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    async Login(login: ILogin) {
      await api.post('/api/Usuarios/token/', login).then(async (response) => {
        this.setToken(response.data);
      });
    },

    async checkToken() {
      console.log('entre aqui checkToken');

      if (this.token) return Promise.resolve(this.token);
      const token = storage.getLocalToken();
      if (!token) return Promise.reject(new Error('Token inválido!'));
      this.setToken(token);
      return this.LoadSession();
    },

    setToken(payload: any) {
      //console.log(payload);
      storage.setLocalToken(payload.token);
      storage.setHeaderToken();
      this.user = payload;
      this.token = payload;
      this.authenticated = true;
    },

    LoadSession() {
      return new Promise((resolve: any, reject) => {
        try {
          this.user = storage.getUser();
          resolve();
        } catch (error) {
          this.logout();
          reject(error);
        }
      });
    },

    logout() {
      storage.deleteLocalToken();
      storage.deleteHeaderToken();
      storage.deleteUser();
      this.user = {};
      this.token = '';
      this.authenticated = false;
    },
  },
});
