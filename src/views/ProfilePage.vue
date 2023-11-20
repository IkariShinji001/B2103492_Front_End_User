<template>
  <q-page>
    <div class="container">
      <h5>Thông tin tài khoản</h5>
      <div class="form">
        <q-input class="input" outlined label="Email" v-model="email"></q-input>
        <q-input
          class="input"
          outlined
          label="Họ và tên"
          v-model="fullName"
        ></q-input>
        <q-input
          class="input"
          outlined
          label="Số điện thoại"
          v-model="phoneNumber"
        ></q-input>
        <q-input
          class="input"
          outlined
          label="Địa chỉ"
          v-model="address"
        ></q-input>

        <q-btn
          class="btn"
          color="primary"
          label="Cập nhật"
          @click="updateAccount"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useSessionStore } from "../store/sessionStore";
import { storeToRefs } from "pinia";
import userService from "../services/user.service";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const store = useSessionStore();
    const toast = useToast();
    const { user } = storeToRefs(store);
    const userInfo = ref();
    const email = ref();
    const fullName = ref();
    const phoneNumber = ref();
    const address = ref();

    onBeforeMount(async () => {
      userInfo.value = await userService.getUser(user.value.id);
      email.value = userInfo.value.email;
      fullName.value = userInfo.value.fullName;
      phoneNumber.value = userInfo.value.phoneNumber;
      address.value = userInfo.value.address;
    });

    const updateAccount = async () => {
      const payload = {
        email: email.value,
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
      };
      try {
        await userService.updateUserInfo(payload);
        toast.success("Cập nhật thành công");
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra");
      }
    };
    return {
      email,
      fullName,
      phoneNumber,
      address,
      updateAccount,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

h5 {
  margin: 0;
}

.form {
  margin-top: 30px;
}
.input {
  margin: 10px 0;
  font-size: 18px;
}

.btn {
  display: flex;
  margin: 0 auto;
  font-size: 18px;
  padding: 0 30px;
}
</style>
