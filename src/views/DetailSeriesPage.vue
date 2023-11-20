<template>
  <q-page>
    <div class="wrapper" v-if="series">
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <img :src="series.image" />
          </div>
          <div class="col-md-6 name">
            <h5>[Bộ sách] {{ series.name }}</h5>
            <p class="label">Nhà xuất bản: {{ series.publisher }}</p>
            <p class="followerCount">
              {{ series.followerCount }} lượt theo dõi
            </p>
          </div>
          <div class="col-md-3 btn-follow-container" v-if="user">
            <q-btn class="btn-follow" label="+ Theo dõi"></q-btn>
          </div>
        </div>
      </div>

      <div class="books">
        <div class="book" v-for="book in series.books">
          <book-card :book="book" :path="`/books/${book._id}`"></book-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import SeriesService from "../services/series.service";
import { useSessionStore } from "../store/sessionStore";
import { storeToRefs } from "pinia";
import BookCard from "../components/BookCard.vue";
export default {
  components: {
    'book-card': BookCard
  },
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const series = ref();

    const store = useSessionStore();
    const { user } = storeToRefs(store);

    onBeforeMount(async () => {
      series.value = await SeriesService.getSeriesById(id);
    });
    return {
      route,
      series,
      user,
    };
  },
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
}

.container {
  padding: 30px;
  height: 350px;
  background-color: white;
}

img {
  width: 100%;
}

.name{
  margin-left: 20px;
}


p {
  margin: 5px;
  font-size: 20px;
}

.followerCount {
  color: crimson;
}

.btn-follow {
  display: flex;
  margin: 50% auto;
  transform: translateY(-50%);
  padding: 10px 50px;
  font-size: 20px;
  border-radius: 20px;
  background-color: #c92127;
  color: white;
  font-weight: bold;
  height: fit-content;
}

.book{
  background-color: white;
  width: 20%;
}

.book:hover{
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.books{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
