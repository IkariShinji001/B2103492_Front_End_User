s<template>
  <q-card class="search-item-container shadow-4">
    <div class="row item" v-for="book in booksFiltered">
      <router-link @click="updateSearchText"  :to="`/books/${book._id}`" class="row">
        <img class="img" :src="book.images[0]" />
        <div class="name-container">
          <p class="name-item">
            {{ book.name }} <br/>
            Volume {{ book.volume }}
          </p>
        </div>
      </router-link>
    </div>
  </q-card>
</template>

<script>
import { watchEffect, ref } from "vue";
import BookService from "../services/book.service";
export default {
  props: {
    searchText: String,
    default: "",
  },
  setup(props, {emit}) {
    const booksFiltered = ref([]);
    const updateSearchText = () =>{
      emit("updateSearchText", null);
    }

    watchEffect(async () => {
      if (props.searchText) {
        booksFiltered.value = await BookService.getBooks(
          6,
          1,
          1,
          -1,
          props.searchText
        );
      } else {
        booksFiltered.value = [];
      }
    });

    return { booksFiltered,updateSearchText };
  },
};
</script>

<style scoped>
.search-item-container {
  margin-top: 5px;
  z-index: 1000000;
  box-shadow: 20px 20px 20px 20px rgba(black, black, black, 0.5) !important;
  position: absolute;
  width: inherit;
}

.name-container{
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  flex-wrap: wrap;
  width: 80%;
}

.name-item {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
}


.img {
  width: 15%;
}

.item {
  margin: 10px;
}

.item:hover {
  background-color: rgb(56, 56, 232);
  color: white;
}


.item:hover .name-item {
  color: white;
}

a {
  text-decoration: none;
  color: black;
}
</style>
