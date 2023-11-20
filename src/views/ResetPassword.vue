<template>
  <q-page>
    <loadingCircle :isShow="isLoading"></loadingCircle>
    <div class="wrapper">
      <div class="form">
        <h5>Thiết lập mật khẩu mới</h5>
        <q-input
          class="input"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Mật khẩu mới"
          v-model="newPassword"
          placeholder="Nhập mật khẩu mới"
          type="password"
        >
          <template v-slot:prepend>
            <q-icon name="password"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          class="input"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Nhập lại mật khẩu mới"
          v-model="confirmPassword"
          placeholder="Nhập lại mật khẩu mới"
          type="password"
        >
          <template v-slot:prepend>
            <q-icon name="password"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn class="btn" @click="submit">Xác nhận</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import authService from "../services/auth.service";
import LoadingCircle from "../components/LoadingCircle.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    loadingCircle: LoadingCircle,
  },
  setup() {
    const route = useRoute();
    const newPassword = ref();
    const confirmPassword = ref();
    const toast = useToast();
    const isLoading = ref();
    const isPwd = ref();

    const submit = async () => {
      if (!newPassword.value) {
        toast.error("Không được để trống");
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        toast.error("Mật khẩu không trùng khớp");
        return;
      }
      try {
        await authService.resetPassword(
          newPassword.value,
          route.query.verificationToken
        );
        toast.success("Đã đặt lại mật khẩu thành công");
      } catch (error) {
        console.log(error);
      }
    };
    return { newPassword, confirmPassword, submit, isLoading, isPwd };
  },
};
</script>

<style scoped>
.wrapper {
  padding-top: 100px;
}

.btn {
  display: flex;
  margin: 0 auto;
  margin-top: 40px;
  padding: 10px 70px;
  background-color: #1976d2;
  color: white;
  font-weight: bold;
}

.form {
  height: 400px;
  padding: 20px;
  margin: 0 auto;
  background-color: white;
  width: 60%;
  border-radius: 10px;
}
h5 {
  font-size: 28px;
  text-align: center;
  margin: 30px 0 30px 0;
}

.input {
  margin: 20px 0;
  font-size: 18px;
}
</style>
