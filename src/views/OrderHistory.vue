<template>
  <q-page>
    <div class="container">
      <h5>Lịch sử mua hàng</h5>
      <q-select
        class="input"
        outlined
        :options="optionFilter"
        v-model="filter"
        label="Lọc theo trạng thái"
        clearable
      ></q-select>

      <q-input
        label="Tìm đơn hàng"
        outlined
        class="input"
        placeholder="Nhập mã đơn hàng"
        v-model="searchId"
        @keyup.enter="handleSearch"
      ></q-input>
      <div class="orders">
        <table style="width: 100%">
          <tr class="row header-table">
            <th class="col-md-3">Mã đơn hàng</th>
            <th class="col-md-2">Giá đơn hàng</th>
            <th class="col-md-2">Ngày đặt hàng</th>
            <th class="col-md-3">Trạng thái đơn hàng</th>
            <th class="col-md-2">Chức năng</th>
          </tr>

          <div class="body-table">
            <tr class="row" v-for="order in filteredOrders" :key="order._id">
              <td class="col-md-3">{{ order._id }}</td>
              <td class="col-md-2">{{ formatPrice(order.orderPrice) }} đ</td>
              <td class="col-md-2">{{ formatDate(order.createdAt) }}</td>
              <td class="col-md-3">{{ order.status }}</td>
              <td class="col-md-2">
                <q-icon
                  class="icon"
                  name="visibility"
                  @click="openDetailFuc(order._id)"
                ></q-icon>
                <q-icon
                  class="icon"
                  name="money_off"
                  @click="cancelOrder(order._id)"
                  v-if="
                    order.status === 'Chờ xác nhận' &&
                    order.statusDilivery !== 'Đã nhận đơn hàng'
                  "
                ></q-icon>
              </td>
            </tr>
          </div>
        </table>
      </div>
    </div>

    <q-dialog v-model="openDetail">
      <q-card style="min-width: 1000px">
        <q-card-section v-if="orderDetail">
          <h6>Thông tin đơn đặt hàng</h6>
          <div class="row label-infor">
            <div class="col-md-3">Mã đơn hàng:</div>
            <div class="col-md-9">{{ orderDetail._id }}</div>
          </div>
          <div class="row label-infor">
            <div class="col-md-3">Họ và tên người đặt hàng:</div>
            <div class="col-md-9">{{ orderDetail.user.fullName }}</div>
          </div>
          <div class="row label-infor">
            <div class="col-md-3">Số điện thoại người đặt hàng:</div>
            <div class="col-md-9">{{ orderDetail.user.phoneNumber }}</div>
          </div>
          <div class="row label-infor">
            <div class="col-md-3">Địa chỉ nhận hàng:</div>
            <div class="col-md-9">{{ orderDetail.address }}</div>
          </div>
          <div class="row label-infor">
            <div class="col-md-3">Trạng thái đơn hàng:</div>
            <div class="col-md-9">{{ orderDetail.status }}</div>
          </div>

          <div
            class="row label-infor"
            v-if="
              orderDetail.status !== 'Từ chối đơn hàng' &&
              orderDetail.status !== 'Chờ xác nhận'
            "
          >
            <div class="col-md-3">Trạng thái giao hàng:</div>
            <div class="col-md-9 row">
              <p>{{ orderDetailStatusDelivery }}</p>
            </div>
          </div>

          <div class="row label-infor">
            <div class="col-md-3">Ghi chú:</div>
            <div class="col-md-9">{{ orderDetail.notes }}</div>
          </div>
          <div
            class="row books"
            v-for="(item, i) in orderDetail.books"
            :key="item._id"
          >
            <img class="col-md-1" :src="item.book.images[0]" />
            <div class="col-md-3">
              {{ item.book.name }} - volume {{ item.book.volume }}
            </div>
            <div class="col-md-2">Số lượng : {{ item.quantity }}</div>
          </div>

          <div class="row label-infor">
            <div class="col-md-3">Tổng tiền đơn hàng:</div>
            <div class="col-md-9 total-price">
              {{ formatPrice(orderDetail.orderPrice) }} đ
            </div>
          </div>

          <div v-if="orderDetailStatusDelivery === 'Đang giao hàng'">
            <q-btn
              class="submit-dilivery"
              label="Đã nhận được hàng"
              @click="updateOrderStatusDilivery"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { onBeforeMount, ref, computed, watchEffect } from "vue";
import orderService from "../services/order.serivce";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const orders = ref();
    const openDetail = ref(false);
    const toast = useToast();
    const searchId = ref();
    const optionFilter = ref([
      "Chờ xác nhận",
      "Chấp nhận đơn hàng",
      "Từ chối đơn hàng",
      "Hủy đơn hàng",
    ]);
    const filter = ref();
    const orderDetail = ref();
    const orderDetailStatusDelivery = ref();

    const statusDiliveryOptions = ref(["Đã nhận đơn hàng"]);

    onBeforeMount(async () => {
      orders.value = await orderService.getUserOrder();
      console.log(orders.value);
    });

    const handleSearch = async () => {
      console.log(searchId.value);
      orders.value = await orderService.getUserOrder(searchId.value);
    };

    const cancelOrder = async (id) => {
      const confirm = window.confirm("Bạn chắc muốn hủy đơn hàng này chứ");
      if (!confirm) {
        return;
      }

      try {
        const res = await orderService.cancelOrder(id);
        toast.success("Hủy đơn hàng thành công");
      } catch (error) {
        console.log(error);
      }
    };

    watchEffect(async () => {
      if (!searchId.value) {
        orders.value = await orderService.getUserOrder();
      }
    });

    const updateOrderStatusDilivery = async () => {
      try {
        const index = orders.value.findIndex(
          (order) => order._id === orderDetail.value._id
        );
        await orderService.updateOrderStatusDilivery(orderDetail.value._id);
        orders.value[index].statusDilivery = "Đã nhận đơn hàng";
        orderDetailStatusDelivery.value = "Đã nhận đơn hàng";
      } catch (error) {
        console.log(error);
      }
    };

    const formatPrice = (value) => {
      return new Intl.NumberFormat().format(value);
    };

    const formatDate = (value) => {
      return value.substring(0, 10);
    };

    const openDetailFuc = (id) => {
      openDetail.value = true;
      const index = orders.value.findIndex((order) => order._id == id);
      orderDetail.value = orders.value[index];
      orderDetailStatusDelivery.value = orderDetail.value.statusDilivery;
    };

    const filteredOrders = computed(() => {
      if (!filter.value) {
        return orders.value;
      }
      return orders.value.filter((order) => order.status === filter.value);
    });

    return {
      handleSearch,
      searchId,
      statusDiliveryOptions,
      orderDetailStatusDelivery,
      openDetail,
      orderDetail,
      filter,
      optionFilter,
      orders,
      formatPrice,
      formatDate,
      openDetailFuc,
      filteredOrders,
      cancelOrder,
      updateOrderStatusDilivery,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

table {
  border-collapse: collapse;
}

h5 {
  margin: 0;
}

h6 {
  margin: 0;
  font-size: 20px;
  text-align: center;
}

th {
  background-color: #1976d2;
  color: white;
}

td {
  text-align: center;
  font-size: 16px;
  padding: 10px 0;
  font-weight: bold;
}

.icon {
  font-size: 26px;
  margin: 0 10px;
  cursor: pointer;
}

.submit-dilivery {
  display: flex;
  margin: 0 auto;
}

.icon:hover {
  color: #c92127;
}

.input {
  font-size: 17px;
  margin: 20px;
}

.label-infor {
  padding: 10px 0;
  font-size: 16px;
}

img {
  width: 100%;
}

.books {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-price {
  color: #c92127;
  font-size: 20px;
  font-weight: bolds;
}

.submit-dilivery {
  background-color: #c92127;
  color: white;
}

.header-table {
  position: sticky;
}

.body-table {
  height: 450px;
  overflow: scroll;
}
</style>
