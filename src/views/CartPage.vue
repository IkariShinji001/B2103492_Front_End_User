<template>
  <q-page>
    <div class="wapper" v-if="cart">  
      <div class="container" v-if="cart.length >  0">
        <h4>Giỏ hàng</h4>
        <div class="row justify-around">
          <div class="infor col-md-8">
            <div class="row justify-around">
              <div class="col-md-2">Ảnh</div>
              <div class="col-md-4">Tên sản phẩm</div>
              <div class="col-md-2">Số lượng</div>
              <div class="col-md-3">Thành tiền</div>
              <div class="col-md-1">Xóa</div>
            </div>
            <ul>
              <li
                class="row justify-around item"
                v-for="(item, i) in cart"
                :key="i"
              >
                <div class="col-md-2"><img :src="item.book.images[0]" /></div>
                <div class="col-md-4">
                  <h5>{{ item.book.name }} - volume {{ item.book.volume }}</h5>
                  <p>{{ item.book.author }}</p>
                  <p class="price">
                    {{ formatPrice(item.book.discountPrice) }} đ
                  </p>
                </div>
                <div class="row col-md-2 quantity">
                  <q-input
                    min="0"
                    :max="item.book.quantity"
                    class="input-quantity col-md-"
                    borderless
                    type="number"
                    v-model.number="item.quantity"
                    @change="updateQuantity(item, item.quantity)"
                  >
                  </q-input>
                </div>
                <div class="item-price col-md-3">
                  {{ formatPrice(item.book.discountPrice * item.quantity) }} đ
                </div>

                <div class="col-md-1">
                  <q-icon
                    class="delete-icon"
                    name="delete"
                    @click="deleteItem(item)"
                  ></q-icon>
                </div>
              </li>
            </ul>
          </div>

          <div class="order col-md-3">
            <div class="total-price-label">Tổng số tiền</div>
            <div class="total-price">{{ formatPrice(totalPrice) }} đ</div>
            <div class="note">(Không bao gồm chi phí vận chuyển)</div>
            <q-btn class="submit" @click="submitPayment">Thanh toán</q-btn>
          </div>
        </div>
      </div>

      <div v-else class="container none">
        <div class="cart-none">
          <img
            class="img-none"
            src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
          />
          Chưa có sản phẩm trong giỏ hàng của bạn
        </div>
        <div>
          <router-link to="/"
            ><q-btn class="back-to-btn">MUA Sắm ngay</q-btn></router-link
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import { useSessionStore } from "../store/sessionStore";
import { storeToRefs } from "pinia";
import userService from "../services/user.service";
import { useRouter } from "vue-router";
export default {
  setup() {
    const cart = ref();
    const router = useRouter();
    const store = useSessionStore();
    const { user } = storeToRefs(store);
    const userCart = ref([]);
    const localStorageCart = ref();
    onBeforeMount(async () => {
      if (user.value) {
        userCart.value = await userService.getAllCart();
      }
      localStorageCart.value = JSON.parse(localStorage.getItem("cart"));
      console.log(userCart.value);
      if (userCart.value && userCart.value?.books?.length > 0) {
        var uniqueLocalBooks = localStorageCart.value.filter((localBook) => {
          return !userCart.value.books.some(
            (userBook) => userBook.id === localBook.id
          );
        });

        cart.value = [
          ...(uniqueLocalBooks || []),
          ...(userCart.value.books || []),
        ];
      } else {
        cart.value = [
          ...(localStorageCart.value || [])
        ];
      }
      console.log(cart.value);

      localStorage.setItem("cart", JSON.stringify(cart.value));
    });

    const filterCartData = computed(() => {
      const data = cart.value.map((data) => {
        return {
          book: data.book._id,
          quantity: data.quantity,
        };
      });
      return data;
    });

    const totalPrice = computed(() => {
      let total = 0;
      if (cart.value) {
        cart.value.map((data) => {
          total += data.book.discountPrice * parseInt(data.quantity);
        });
      }

      return total;
    });

    const deleteItem = async (book) => {
      const index = cart.value.indexOf(book);
      cart.value.splice(index, 1);
      localStorageCart.value.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(localStorageCart.value));
      if (book._id) {
        await userService.removeBookFromCart(book.book._id);
      }
    };

    const formatPrice = (value) => {
      return new Intl.NumberFormat().format(value);
    };

    const submitPayment = (book) => {
      localStorage.setItem("booksFinal", JSON.stringify(filterCartData.value));
      if (user.value) {
        router.push({ path: "/checkout" });
      } else {
        router.push({ path: "/login", query: { login: "loginToCart" } });
      }
    };

    const updateQuantity = async (book, newQuantity) => {
      localStorage.setItem("cart", JSON.stringify(cart.value));
      console.log(book);
      if (book._id) {
        console.log("dasdas");
        await userService.updateBookQuantityInCart({
          bookId: book.book._id,
          quantity: newQuantity,
        });
      }
    };

    return {
      updateQuantity,
      cart,
      formatPrice,
      filterCartData,
      totalPrice,
      deleteItem,
      submitPayment,
    };
  },
};
</script>

<style scoped>
.wapper {
  padding: 20px 0;
}

.container {
  text-align: center;
}

.img-none {
  width: 200px;
  height: 200px;
}

.cart-none {
  display: flex;
  justify-content: center;
  align-items: center;
}

.none {
  background-color: white;
  min-height: 400px;
  font-size: 40px;
}

.infor {
  padding: 30px;
  background-color: white;
  border-radius: 10px;
}

.order {
  position: -webkit-sticky;
  top: 20px;
  position: sticky;
  padding: 30px;
  margin-left: 10px;
  background-color: white;
  height: min-content;
}

img {
  width: 100%;
}

.quantity {
  justify-content: space-around;
  align-items: center;
  height: fit-content !important;
  border: 2px solid #cccccc;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.item-price {
  color: #c92127;
  font-size: 20px;
  font-weight: bold;
}

.item {
  align-items: center;
  justify-items: center;
}

.input-quantity {
  font-size: 20px;
  font-weight: bold;
  text-align: center !important;
  width: 60%;
}

.delete-icon {
  cursor: pointer;
  font-size: 30px;
}

.delete-icon:hover {
  color: #c92127;
}

.total-price-label {
  font-size: 20px;
  font-weight: bold;
}

.total-price {
  margin-top: 40px;
  font-size: 25px;
  font-weight: bold;
  color: #c92127;
}

.submit {
  background-color: #c92127;
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  margin-top: 30px;
}

.back-to-btn {
  font-size: 20px;
  padding: 5px 40px;
  background-color: #c92127;
  color: white;
}
</style>
