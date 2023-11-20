<template>
  <q-page>
    <loading-circle :isShow="isLoading"></loading-circle>
    <div class="wrapper">
      <div class="container-address">
        <h5>Địa chỉ giao hàng</h5>
        <q-input
          class="input"
          v-model="userReceive"
          outlined
          label="Tên người nhận (*)"
        ></q-input>
        <q-input
          class="input"
          v-model="phoneNumber"
          outlined
          label="Số điện thoại (*)"
        ></q-input>
        <q-input
          class="input"
          v-model="address"
          type="textarea"
          outlined
          label="Địa chỉ nhận hàng (*)"
        ></q-input>
      </div>
    </div>

    <div class="shipment-method">
      <div>
        <h5>Phương thức vận chuyển</h5>
        <p v-if="!userReceive || !phoneNumber || !address">
          Quý khách vui lòng điền tên và địa chỉ giao nhận trước.
        </p>
        <div v-else>
          <q-radio
            v-model="methodShipment"
            val="feeShip"
            label="Giao hàng tiêu chuẩn"
            class="radio"
          >
          </q-radio>
          <div class="price-ship">{{ formatPrice(calFeeShip) }}đ</div>
          <div class="diliveryDate">
            Ngày dự kiến nhận hàng: {{ getDayDiliveri }}
          </div>
        </div>
      </div>
    </div>

    <div class="payment-method">
      <div>
        <h5>Phương thức thanh toán</h5>
        <div>
          <q-radio v-model="methodPayment" val="cod" label class="radio">
            <q-icon class="icon" name="payments"></q-icon>
            Thanh toán bằng tiền mặt khi nhận hàng
          </q-radio>
          <div>
            <q-radio
              v-model="methodPayment"
              val="momo"
              disable
              label
              class="radio"
            >
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10294"
              />
              Thanh toán momo (comming soon)
            </q-radio>
          </div>
        </div>
      </div>
    </div>

    <div class="notes">
      <div>
        <h5>Ghi chú</h5>
        <q-input
          class="input-note"
          v-model="notes"
          type="textarea"
          outlined
          label="Ghi chú"
        ></q-input>
      </div>
    </div>

    <div class="check-order">
      <div>
        <h5>Kiểm tra lại đơn hàng</h5>
        <div class="row recheck-order" v-for="item in cart">
          <div class="col-md-1">
            <img :src="item.book.images[0]" />
          </div>
          <div class="col-md-5 book-label name">
            {{ item.book.name }} - volume {{ item.book.volume }}
          </div>

          <div class="col-md-2 book-label">Số lượng: {{ item.quantity }}</div>

          <div class="col-md-2 book-label">
            {{ formatPrice(item.book.discountPrice) }} đ
          </div>

          <div class="col-md-2 book-label price">
            {{ formatPrice(item.book.discountPrice * item.quantity) }} đ
          </div>
        </div>
      </div>
    </div>
    <div class="submit shadow-up-3">
      <div class="content">
        <div class="label-submit row">
          <div class="col-md-10">
            <p>Thành tiền</p>
          </div>
          <div class="col-md-2">
            <p>{{ formatPrice(totalPrice) }} đ</p>
          </div>
          <div class="col-md-10">
            <p>Phí vận chuyển</p>
          </div>
          <div class="col-md-2">
            <p>{{ formatPrice(calFeeShip) }} đ</p>
          </div>
          <div class="col-md-10">
            <strong><p>Tổng số tiền</p></strong>
          </div>
          <div class="col-md-2 total-price">
            <p>{{ formatPrice(totalPrice + calFeeShip) }} đ</p>
          </div>
        </div>
      </div>

      <q-separator></q-separator>
      <div>
        <div>
          <router-link to="/cart" class="go-to-cart"
            ><q-icon name="keyboard_backspace"></q-icon> Quay về giỏ
            hàng</router-link
          >
        </div>
        <q-btn
          class="btn-submit"
          color="primary"
          label="Xác nhận thanh toán"
          @click="submitOrder"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import userService from "../services/user.service";
import orderService from "../services/order.serivce";
import validator from "../helper/validator";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import LoadingCircle from '../components/LoadingCircle.vue';
export default {
  components:{
    'loading-circle': LoadingCircle
  },
  setup() {
    const isLoading = ref(false);
    const router = useRouter();
    const userReceive = ref();
    const phoneNumber = ref();
    const address = ref();
    const user = ref();
    const books = ref();
    const methodPayment = ref("cod");
    const methodShipment = ref("feeShip");
    const cart = ref();
    const notes = ref();
    const toast = useToast();
    const fieldRequired = ["userReceive", "phoneNumber", "address", "books"];
    onBeforeMount(async () => {
      books.value = JSON.parse(localStorage.getItem("booksFinal"));
      cart.value = JSON.parse(localStorage.getItem("cart"));
      user.value = await userService.getUser();
      userReceive.value = user.value.fullName;
      phoneNumber.value = user.value.phoneNumber;
      address.value = user.value.address;
    });

    const calFeeShip = computed(() => {
      console.log(books.value);
      let feeShip = 0;
      if (userReceive.value && phoneNumber.value && address.value) {
        let quantity = 0;
        if (books.value) {
          books.value.forEach((book) => {
            quantity += book.quantity;
          });
          if (quantity < 3) {
            feeShip = 16000;
          } else if (quantity >= 3 && quantity < 5) {
            feeShip = 19000;
          } else if (quantity >= 5 && quantity < 8) {
            feeShip = 23000;
          } else {
            feeShip = 30000;
          }
        }
      }
      return feeShip;
    });

    const getDayDiliveri = computed(() => {
      var today = new Date();
      var randomDays = Math.floor(Math.random() * 5) + 1;
      today.setDate(today.getDate() + randomDays);
      const diliveryDate = today.toDateString();
      return diliveryDate;
    });

    const totalPrice = computed(() => {
      let total = 0;
      if (cart.value) {
        cart.value.forEach((book) => {
          total += book.quantity * book.book.discountPrice;
        });
      }
      return total;
    });

    const formatPrice = (value) => {
      return new Intl.NumberFormat().format(value);
    };

    const submitOrder = async () => {
      const payload = {
        books: books.value,
        userReceive: userReceive.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        feeShipment: calFeeShip.value,
        notes: notes.value,
        deliveryDate: getDayDiliveri.value,
      };

      const isQualified = validator.checkSelectedFields(payload, fieldRequired);
      if (!isQualified) {
        toast.error("Không được để trống các trường (*)");
        return;
      }
      try {
        isLoading.value = true;
        await orderService.createOrder(payload);
        toast.success("Đơn hàng đã được đặt");
        isLoading.value = false;
        router.push({ path: "/checkout/success" });
      } catch (error) {
        isLoading.value = false;
        console.log(error);
      }
    };

    return {
      getDayDiliveri,
      notes,
      submitOrder,
      cart,
      books,
      methodPayment,
      calFeeShip,
      userReceive,
      phoneNumber,
      address,
      user,
      formatPrice,
      methodShipment,
      totalPrice,
      isLoading
    };
  },
};
</script>
<style scoped>
.wrapper {
  padding-top: 20px;
}
.container-address {
  background-color: white;
  border-radius: 10px;
  padding-bottom: 20px;
}

.content {
  width: 90%;
  margin: 0 auto;
}

h5 {
  padding: 10px;
  margin: 0;
}

.input {
  font-weight: bold;
  font-size: 19px;
  margin-top: 10px;
  width: 50%;
  margin-left: 100px;
}

.submit {
  margin: 0 auto;
  width: 100%;
  background-color: white;
  height: 180px;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  z-index: 100000;
}

.shipment-method,
.payment-method,
.notes,
.check-order {
  margin-top: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.check-order {
  margin-bottom: 30px;
}

.radio {
  font-size: 20px;
}

.price-ship {
  color: #c92127;
  font-weight: bold;
  font-size: 20px;
  margin-left: 40px;
}

.icon {
  font-size: 40px;
}

.input-note {
  font-size: 20px;
}

.recheck-order img {
  width: 100%;
}

.recheck-order {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-label {
  font-size: 20px;
}

.name {
  text-align: center;
}

.price {
  font-weight: bold;
  color: #c92127;
}

.submit p {
  margin: 2px 0;
  font-size: 18px;
}

.content {
  text-align: right;
}

.label-submit {
  display: flex;
}

.total-price {
  font-weight: bold;
  color: #c92127;
  font-size: 30px;
}

.btn-submit {
  padding: 10px 30px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  background-color: #c92127 !important;
  position: absolute;
  right: 100px;
}

.go-to-cart {
  position: absolute;
  text-decoration: none;
  font-size: 20px;
  color: black;
  font-weight: bold;
}

.diliveryDate {
  font-size: 20px;
  margin-left: 20px;
}
</style>
