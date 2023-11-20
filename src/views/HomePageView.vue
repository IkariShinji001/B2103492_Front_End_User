<template>
  <q-page>
    <div class="wrapper">
      <section class="row carousel">
        <carousel :images="images" class="col-md-9"></carousel>

        <div class="col-md-3 row">
          <img
            class="col-md-12 rounded-10 ln"
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/Manga_LDP_Block_web_07.png"
          />
        </div>
      </section>

      <div class="row">
        <img
          class="col-md-4 image rounded-10"
          src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/Manga_LDP_Tagname_10.jpg"
        />
      </div>

      <div class="books">
        <div class="book-container" v-if="books">
          <book-card
            class="book"
            v-for="(book, i) in books"
            :key="i"
            :book="book"
            :path="`/books/${book._id}`"
          ></book-card>
        </div>
        <q-btn class="more-btn" color="primary" @click="goToBooks"
          >XEM THÊM</q-btn
        >
      </div>

      <div></div>
    </div>
  </q-page>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import BookCard from "../components/BookCard.vue";
import Carousel from "../components/Carousel.vue";
import bookService from "../services/book.service";
import { useRouter } from "vue-router";
export default {
  components: {
    carousel: Carousel,
    "book-card": BookCard,
  },
  setup() {
    const books = ref();
    const router = useRouter();
    const images = [
      "https://cdn0.fahasa.com/media/magentothem/banner7/Manga_mainbanner_T10_Slide_840x320_1.jpg",
      "https://cdn0.fahasa.com/media/magentothem/banner7/SaleThu3_W3_T1023_banner_Slide_840x320.jpg",
    ];
    onBeforeMount(async () => {
      books.value = await bookService.getBooks(8, 1, 1, -1);
    });

    const goToBooks = () => {
      router.push("/books");
    };
    return {
      images,
      books,
      goToBooks,
    };
  },
};
</script>

<style scoped>
.wrapper {
  padding-bottom: 100px;
}
.ln {
  height: 93%;
}

.image {
  margin: 0 auto;
}

.books {
  padding-bottom: 30px;
  background-color: white;
}

.book-container {
  width: 100%;
  margin: 0 auto !important;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: left;
}

.book {
  width: 25%;
}

.book:hover {
  border: 2px solid #cccccc !important;
  box-shadow: 2px 2px 2px #cccccc !important;
}

.more-btn {
  display: flex;
  margin: 0 auto;
  width: 20%;
  padding: 10px 0;
  margin-top: 30px;
  font-weight: bold;
  font-size: 18px;
}
</style>
