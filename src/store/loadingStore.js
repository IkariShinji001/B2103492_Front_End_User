import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref();

  function setLoading(state) {
    isLoading.value = state;
  }

 
  return { setLoading, isLoading};
})