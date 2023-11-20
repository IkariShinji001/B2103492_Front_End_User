<template>
  <q-form class="form">
    <q-input class="input" outlined v-model="username" label="Tên tài khoản">
      <template v-slot:label>
        <p class="text-h7">Tên đăng nhập (*)</p>
      </template>

      <template v-slot:prepend>
        <q-icon name="account_circle"></q-icon>
      </template>
    </q-input>
    <q-input
      class="input"
      :type="isPwd ? 'password' : 'text'"
      outlined
      v-model="password"
      label="Mật khẩu"
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

    <q-btn class="btn" color="primary" label="Đăng nhập" @click="login" />
  </q-form>
</template>

<script>
import { ref } from "vue";
import { useLoadingStore } from "../store/loadingStore";
import { useSessionStore } from "../store/sessionStore";
import { storeToRefs } from "pinia";
import validator from "../helper/validator";
import { useToast } from "vue-toastification";
import UserService from "../services/user.service";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const store = useLoadingStore();
    const sessionStore = useSessionStore();
    const { isLoading } = storeToRefs(store);
    const isPwd = ref(true);
    const username = ref();
    const password = ref();
    const fieldRequired = ["username", "password"];

    const login = async () => {
      const payload = {
        username: username.value,
        password: password.value,
      };

      const qualified = validator.checkSelectedFields(payload, fieldRequired);

      if (!qualified) {
        toast.error("Không được để trống !");
        return;
      }

      try {
        isLoading.value = true;
        store.setLoading(isLoading.value);

        const res = await UserService.loginUser(payload);
        console.log(res);
        isLoading.value = false;
        store.setLoading(isLoading.value);
        sessionStore.setToken(res.access_token);
        sessionStore.setUser(res.success);
        localStorage.setItem("user", JSON.stringify(res.success));
        toast.success("Đăng nhập thành công");
        if (route.query.login === "loginToCart") {
          router.push({ path: "/checkout" });
        } else {
          router.push({ path: "/" });
        }
      } catch (error) {
        isLoading.value = false;
        store.setLoading(isLoading.value);
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error("Sai tài khoản hoặc mật khẩu");
      }
    };

    return { isPwd, username, password, login };
  },
};
</script>

<style scoped>
.form {
  width: 700px;
}

.input {
  margin: 10px 0;
  font-size: 18px;
}

.btn {
  display: flex;
  margin: 0 auto;
  padding: 10px 60px;
  font-size: 18px;
  margin-top: 30px;
}
</style>
