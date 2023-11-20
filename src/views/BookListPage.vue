<template>
  <q-page>
    <section class="row container justify-around">
      <sidebar-filter
        @updateSelectedGenres="handleSelectedGenres"
        @updatePriceOption="handlePrice"
        class="side-bar col-md-3"
      ></sidebar-filter>

      <div class="col-md-8">
        <div class="row search justify-around">
          <h6 class="col-md-5" v-if="route.query.search">
            Kết quả tìm kiếm : {{ route.query.search }}
          </h6>

          <q-select
            clearable
            outlined
            class="col-md-3"
            :options="sortDateOpts"
            label="Sắp xếp theo thời gian"
            v-model="sortDate"
            option-label="text"
            map-options
            emit-value
          ></q-select>
          <q-select
            clearable
            outlined
            class="col-md-3"
            :options="sortNameOpts"
            label="Sắp xếp theo tên"
            option-label="text"
            v-model="sortName"
            map-options
            emit-value
          ></q-select>
        </div>
        <q-separator />
        <div class="books-container row col-md-12">
          <book-card
            class="book"
            v-for="book in books"
            :key="book._id"
            :path="`/books/${book._id}`"
            :book="book"
          ></book-card>
        </div>

        <div v-if="bookCount">
          <pagination
            @updatePage="handleUpdatePage"
            :currentPage="page"
            :maxPage="lengthPage"
          ></pagination>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import SidebarFilter from "../components/SidebarFilter.vue";
import BookCard from "../components/BookCard.vue";
import BookService from "../services/book.service";
import Pagination from "../components/Pagination.vue";
import { computed, onBeforeMount, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    "sidebar-filter": SidebarFilter,
    "book-card": BookCard,
    pagination: Pagination,
  },
  setup() {
    const route = useRoute();
    const limit = 12;
    const page = ref(1);
    const bookCount = ref();

    onBeforeMount(async () => {
      const count = await BookService.getBookCount();
      bookCount.value = count;
    });

    const lengthPage = computed(() => {
      return Math.ceil(bookCount.value / limit);
    });

    const handleUpdatePage = (value) => {
      page.value = value;
    };
    const sortDateOpts = ref([
      {
        text: "Mới nhất",
        value: -1,
      },
      {
        text: "Cũ nhất",
        value: 1,
      },
    ]);

    const sortNameOpts = ref([
      {
        text: "A - Z",
        value: 1,
      },
      { text: "Z - A", value: -1 },
    ]);

    const sortName = ref();
    const sortDate = ref();
    const priceFilter = ref({
      minPrice: 0,
      maxPrice: 0,
    });

    const selectedGenres = ref();
    const books = ref();

    const handlePrice = (price) => {
      priceFilter.value = price;
    };

    const handleSelectedGenres = (genres) => {
      selectedGenres.value = genres;
    };

    watchEffect(async () => {
      console.log(priceFilter.value);
      books.value = await BookService.getBooks(
        limit,
        page.value,
        sortName.value,
        sortDate.value,
        route.query.search,
        selectedGenres.value,
        priceFilter.value.min,
        priceFilter.value.max
      );
    });
    return {
      handleSelectedGenres,
      handlePrice,
      bookCount,
      selectedGenres,
      books,
      route,
      sortNameOpts,
      sortName,
      sortDateOpts,
      sortDate,
      lengthPage,
      page,
      handleUpdatePage,
    };
  },
};
</script>

<style scoped>
.container {
  height: min-content;
  padding-top: 20px;
}

.books-container {
  background-color: white;
}

.book {
  width: 25%;
}

.book:hover {
  border: 2px solid #cccccc !important;
  box-shadow: 2px 2px 2px #cccccc !important;
}

h6 {
  margin: 10px 0;
}

.search {
  padding: 20px 10px;
  background-color: white;
}
</style>
