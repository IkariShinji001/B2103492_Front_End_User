<template>
  <q-page>
    <section class="container" v-if="book">
      <div class="row book-info">
        <div class="carousel col-md-5">
          <carousel :images="book.images"></carousel>

          <div class="row justify-around group-btn">
            <q-btn
              v-if="book.isInBussiness"
              @click="addToCart"
              icon="shopping_cart"
              class="col-md-5 btn-cart"
              >Thêm vào giỏ hàng</q-btn
            >
            <q-btn
              class="col-md-5 btn-buy"
              @click="buyNow"
              v-if="book.isInBussiness"
              >Mua Ngay
            </q-btn>
          </div>
        </div>

        <div class="col-md-7">
          <div class="short-info">
            <p class="name">
              {{ book.name }} - Volume {{ book.volume }}
              <span v-if="book.promotions[0]">-</span>
              {{ book.promotions[0] }}
            </p>
            <p class="author label-infor">
              Tác giả: <strong> {{ book.author }}</strong>
            </p>
            <p class="book-cover label-infor">
              Hình thức bìa: <strong>{{ book.bookCover }}</strong>
            </p>
            <p class="publisher label-infor" v-if="book.series">
              Nhà xuất bản: <strong>{{ book.series.publisher }}</strong>
            </p>
            <p class="label-infor" v-if="book.series">
              Bộ sách:
              <router-link class="series" :to="`/series/${book.series._id}`"
                ><strong>{{ book.series.name }}</strong>
                <q-icon name="chevron_right"></q-icon>
              </router-link>
            </p>
          </div>
          <div>
            <div v-if="book.isInBussiness">
              <div class="row pro-rating">
                <rating-star
                  v-if="rating"
                  :star="rating.avgRating"
                  :readonly="true"
                ></rating-star>
                <div class="numberOfRating">
                  ( {{ rating.numberOfRating }} đánh giá)
                </div>
              </div>

              <div v-if="book.discountPrice !== book.price">
                <div class="price row">
                  <span class="discount-price"
                    >{{ formatPrice(book.discountPrice) }} đ</span
                  >

                  <span class="origin-price"
                    >{{ formatPrice(book.price) }} đ</span
                  >

                  <div class="discount">- {{ book.discount }}%</div>
                </div>
              </div>

              <div v-else>
                <span class="discount-price"
                  >{{ formatPrice(book.price) }} đ</span
                >
              </div>
              <div class="row quantity-container">
                <div class="label-infor quantity-label">
                  <strong>Số lượng: </strong>
                </div>
                <q-input
                  outlined
                  v-model="quantity"
                  class="quantity"
                  min="1"
                  max="1000"
                  type="number"
                  label="Số lượng"
                >
                </q-input>
              </div>
            </div>

            <div v-else class="not-in-bussiness">
              Sản phẩm này đã ngừng kinh doanh
            </div>
          </div>
        </div>
      </div>

      <div class="book-info-detail">
        <h6>Thông tin sản phẩm</h6>

        <div class="row">
          <div class="col-md-3">
            <div class="label-infor">
              <strong class="label-infor-detail">Tác giả: </strong>
            </div>
            <div>
              <strong class="label-infor-detail">Ngôn ngữ :</strong>
            </div>
            <div>
              <strong class="label-infor-detail">Trọng lượng (gram) :</strong>
            </div>
            <div>
              <strong class="label-infor-detail">Số trang: </strong>
            </div>
            <div>
              <strong class="label-infor-detail">Hình thức bìa: </strong>
            </div>
            <div>
              <strong class="label-infor-detail">Genres: </strong>
            </div>
          </div>

          <div class="col-md-8">
            <div>
              <p>{{ book.author }}</p>
            </div>

            <div>
              <p>Tiếng Việt</p>
            </div>
            <div>
              <p>{{ book.weight }}</p>
            </div>

            <div>
              <p>{{ book.numberOfPages }}</p>
            </div>

            <div>
              <p>{{ book.bookCover }}</p>
            </div>

            <div>
              <span v-for="genres in book.genres" :key="genres._id">{{
                genres.type
              }}</span>
            </div>
          </div>
        </div>

        <q-separator class="separator"></q-separator>
        <div>
          <h6>{{ book.name }} - Volume {{ book.volume }}</h6>

          <p class="summarize">{{ book.summarize }}</p>
        </div>
      </div>

      <div class="rating">
        <h6>Đánh giá sản phẩm</h6>
        <rating-star
          @updateStarRating="updateStarRating"
          class="user-rating"
          :readonly="false"
        ></rating-star>

        <q-input
          outlined
          class="comment"
          type="textarea"
          label="Bình luận"
          v-model="comment"
          :disable="!isBought"
        ></q-input>

        <q-btn
          @click="submitComment"
          class="submit-comment"
          v-if="isBought"
          color="primary"
        >
          Gửi
        </q-btn>
      </div>

      <div class="comment-section" v-if="book.review.length > 0">
        <h6>Bình luận</h6>
        <div class="row comments" v-for="review in book.review">
          <div class="col-md-3">
            <q-icon name="account_circle"></q-icon> {{ review.userId }}
          </div>

          <div class="col-md-9">
            {{ review.comment }}
            <div>
              <rating-star
                class="comment-rating"
                :star="review.star"
                :readonly="true"
              ></rating-star>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import Carousel from "../components/Carousel.vue";
import bookService from "../services/book.service";
import { useRoute } from "vue-router";
import RatingStar from "../components/RatingStar.vue";
import { useSessionStore } from "../store/sessionStore";
import { storeToRefs } from "pinia";
import orderSerivce from "../services/order.serivce";
import { useToast } from "vue-toastification";
import UserService from "../services/user.service";
import { useRouter } from "vue-router";
export default {
  components: {
    carousel: Carousel,
    "rating-star": RatingStar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const book = ref();
    const quantity = ref(1);
    const id = route.params.id;
    const rating = ref(0);
    const isBought = ref(null);
    const comment = ref("");
    const userRating = ref();

    const store = useSessionStore();

    const { user } = storeToRefs(store);

    const formatPrice = (value) => {
      return new Intl.NumberFormat().format(value);
    };

    const updateStarRating = (value) => {
      userRating.value = value;
    };

    const addToCart = async () => {
      if (quantity.value > book.value.quantity) {
        alert("Không đủ số lượng " + quantity.value + " trong kho");
        return false;
      }

      const payload = {
        bookId: id,
        quantity: quantity.value,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItemIndex = cart.findIndex(
        (item) => item.book._id === id
      );
      if (existingCartItemIndex !== -1) {
        cart[existingCartItemIndex].quantity =
          parseInt(cart[existingCartItemIndex].quantity) +
          parseInt(quantity.value);
      } else {
        cart.push({ book: book.value, quantity: quantity.value });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      if (user.value) {
        try {
          const res = await UserService.addToCart(payload);
        } catch (error) {
          toast.error("Thêm vào giỏ hàng thất bại");
          console.log(error);
        }
      }
      toast.success("Thêm vào giỏ hàng thành công");
    };

    const buyNow = async () => {
      const res = await addToCart();
      if (res === false) {
        return;
      }
      const confirm = window.confirm(
        "Bạn muốn tiếp tục xem các mặt hàng khác hay đến trang thanh toán"
      );
      if (confirm) {
        setTimeout(() => {
          router.push("/cart");
        }, 1000);
      }
    };

    const submitComment = async () => {
      if (!userRating.value) {
        alert("Vui lòng đánh giá sản phẩm");
        return;
      }
      if (comment.value.length < 20) {
        alert("Bình luận phải có 20 ký tự");
        return;
      }

      try {
        const res = await bookService.newRating(
          userRating.value,
          comment.value,
          id
        );
        userRating.value = null;
        comment.value = null;
        toast.success("Đã đánh giá sản phẩm thành công");
      } catch (error) {
        toast.error("Xảy ra lỗi trong quá trình đánh giá sản phẩm");
        console.log(error);
      }
    };

    onBeforeMount(async () => {
      book.value = await bookService.getBookById(id);
      rating.value = await bookService.getRating(id);
      if (user.value) {
        isBought.value = await orderSerivce.isBoughtOrder(id);
      }
    });
    return {
      formatPrice,
      userRating,
      book,
      id,
      quantity,
      rating,
      user,
      isBought,
      comment,
      updateStarRating,
      submitComment,
      addToCart,
      buyNow,
    };
  },
};
</script>

<style scoped>
.container {
  padding-top: 20px;
}

.book-info {
  padding: 50px 0;
  margin-top: 20px;
  background-color: white;
}

.book-info-detail {
  padding: 20px 20px;
  margin-top: 20px;
  background-color: white;
}

.group-btn {
  padding-top: 30px;
}

.btn-cart {
  border-radius: 10px;
  color: #c92127;
}

.btn-buy {
  border-radius: 10px;
  padding: 15px 0;
  background-color: #c92127;
  color: white;
  font-weight: bold;
}

.name {
  font-size: 30px;
  font-weight: bold;
}

.series {
  color: #2489f4;
  text-decoration: none;
}

.label-infor {
  font-size: 16px;
}

.price {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.discount-price {
  font-size: 32px;
  font-weight: bold;
  color: #c92127;
}

.origin-price {
  text-decoration: line-through;
  margin-left: 20px;
  font-size: 18px;
  line-height: 100%;
}

.discount {
  background-color: #c92127;
  color: white;
  padding: 5px 20px;
  border-radius: 10px;
  font-size: 20px;
  margin-left: 20px;
}

.quantity {
  margin-top: 15px;
  width: 20%;
  font-size: 20px;
  font-weight: bold;
}

input {
  font-weight: bold;
}

.quantity-label {
  margin-right: 40px;
}

.quantity-container {
  align-items: center;
}

h6 {
  margin: 0;
}

.label-infor-detail {
  display: block;
  margin: 10px 0;
  font-size: 16px;
}

.separator {
  margin: 30px 0;
}

.summarize {
  margin-top: 10px;
  font-size: 16px;
}

.rating {
  padding: 20px 0;
  margin-top: 20px;
  background-color: white;
  margin-bottom: 50px;
}

.pro-rating {
  display: flex;
  align-items: center;
}

.numberOfRating {
  font-size: 24px;
  color: #f6a500 !important;
  margin-left: 10px;
}

.user-rating {
  display: flex;
  align-items: center;
}

.comment {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 18px;
}

.submit-comment {
  display: flex;
  margin: auto;
  padding: 10px 50px;
  margin-top: 20px;
}

.comment-section {
  margin-top: 20px;
  padding: 20px 10px;
  background-color: white;
}

.comments:nth-child(even) {
  width: 80%;
  margin: 0 auto;
  padding: 10px 10px;
  background-color: #cccccc7d;
  font-size: 18px;
}

.comments:nth-child(odd) {
  width: 80%;
  margin: 0 auto;
  padding: 10px 10px;
  background-color: rgb(240, 240, 240);
  font-size: 18px;
}

.comment-rating {
  font-size: 8px;
}

.not-in-bussiness {
  margin-top: 100px;
  font-size: 30px;
}
</style>
