<script setup>
import { RouterView } from "vue-router";
import HeaderPage from "./components/HeaderPage.vue";
import LoadingCircle from "./components/LoadingCircle.vue";
import { useLoadingStore } from "./store/loadingStore";
import { storeToRefs } from "pinia";
import Footer from "./components/Footer.vue";
const store = useLoadingStore();
const { isLoading } = storeToRefs(store);
</script>

<template>
  <LoadingCircle :isShow="isLoading"></LoadingCircle>
  <HeaderPage></HeaderPage>
  <main class="main">
    <div class="wrapper">
      <q-layout>
        <q-page-container>
          <RouterView />
        </q-page-container>
        <Footer></Footer>
      </q-layout>
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "Quicksand", sans-serif;
}

.main{
  background-color: #cccccc44;
  z-index: -10;
}

.wrapper {
  width: 95%;
  margin: 0 auto;
}
</style>
