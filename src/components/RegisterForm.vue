<template>
  <q-form class="form">
    <q-input
      class="input"
      outlined
      label="Tên đăng nhập (*)"
      v-model="username"
    >
      <template v-slot:label>
        <p class="text-h7">Tên đăng nhập (*)</p>
      </template>

      <template v-slot:prepend>
        <q-icon name="account_circle"></q-icon>
      </template>
    </q-input>
    <q-input class="input" outlined label="Email (*)" v-model="email">
      <template v-slot:prepend>
        <q-icon name="mail"></q-icon>
      </template>
    </q-input>
    <q-input
      label="Mật khẩu (*)"
      outlined
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      autocomplete="off"
      class="input"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>

      <template v-slot:prepend>
        <q-icon name="password"></q-icon>
      </template>
    </q-input>

    <q-input
      label="Nhập lại mật khẩu (*)"
      outlined
      v-model="confirmPassword"
      :type="isPwd ? 'password' : 'text'"
      autocomplete="off"
      class="input"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>

      <template v-slot:prepend>
        <q-icon name="password"></q-icon>
      </template>
    </q-input>

    <q-btn class="btn" @click="checkInfo">Đăng Ký</q-btn>

    <p class="login">
      Bạn có đã tài khoản <router-link to="/login">Đăng nhập</router-link>
    </p>
  </q-form>
</template>

<script>
import { ref } from "vue";
import validator from "../helper/validator";
import { useToast } from "vue-toastification";
import UserService from "../services/user.service";
import isEmail from "validator/lib/isEmail";
import { useLoadingStore } from "../store/loadingStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
export default {
  setup({ emit }) {
    const router = useRouter();
    const store = useLoadingStore();
    const { isLoading } = storeToRefs(store);
    const toast = useToast();
    const typeInput = ref("password");
    const username = ref();
    const email = ref();
    const password = ref();
    const confirmPassword = ref();
    const isPwd = ref(true);
    const fieldRequired = ["username", "email", "password", "confirmPassword"];

    const checkInfo = async () => {
      const userInfo = {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      const qualified = validator.checkSelectedFields(userInfo, fieldRequired);

      if (!qualified) {
        toast.error("Không được để trống các trường (*)");
        return;
      }

      if (!isEmail(email.value)) {
        toast.error("Email không hợp lệ!");
        return;
      }
      if (confirmPassword.value !== password.value) {
        toast.error("Mật khẩu và mật khẩu xác nhận không trùng khớp");
        return;
      }

      await submit(userInfo);
    };

    const submit = async (payload) => {
      try {
        isLoading.value = true;
        store.setLoading(isLoading.value);
        const res = await UserService.createUser(payload);
        toast.success(
          "Tạo tài khoản thành công!"
        );
        isLoading.value = false;
        store.setLoading(isLoading.value);
        router.push(`/register/notify/${email.value}`);
      } catch (error) {
        isLoading.value = false;
        store.setLoading(isLoading.value);
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error("Xảy ra lỗi trong quá trình đăng ký tài khoản");
      }
    };

    return {
      isPwd,
      username,
      email,
      password,
      confirmPassword,
      typeInput,
      checkInfo,
    };
  },
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  max-width: 700px;
}

.input {
  font-size: 18px;
  margin-top: 20px;
}

.btn {
  background-color: #1976d2;
  font-weight: bold;
  padding: 15px 80px;
  display: flex;
  margin: 0 auto;
  margin-top: 30px;
  color: white;
}

.login {
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
}
</style>
