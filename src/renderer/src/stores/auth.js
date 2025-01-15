// @ts-nocheck
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    login(user) {
      this.user = user;
    },
    logout() {
       this.$reset();  
      router.push('/login');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
