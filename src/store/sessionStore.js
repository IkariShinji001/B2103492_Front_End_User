import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const user = ref(null);
  const accessToken = ref(null);

  function setUser(newUser) {
    user.value = newUser;
  }

  function setToken(newToken) {
    accessToken.value = newToken;
  }

  function clearSession() {
    user.value = null;
    token.value = null;
  }
 
  return { user, accessToken , setUser, setToken, clearSession };
})