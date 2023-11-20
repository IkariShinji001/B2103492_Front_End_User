<template>
  <q-page>
    <loadingCircle :isShow="isLoading"></loadingCircle>
    <div class="wrapper">
      <div class="form">
        <h5>Quên mật khẩu</h5>
        <q-input
          class="input"
          outlined
          type="email"
          label="Email"
          v-model="email"
          placeholder="Nhập email tài khoản đã đăng ký"
        >
          <template v-slot:prepend> <q-icon name="mail"></q-icon> </template
        ></q-input>
        <q-btn class="btn" @click="submit">Xác nhận</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import isEmail from "validator/lib/isEmail";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import authService from '../services/auth.service'
import LoadingCircle from "../components/LoadingCircle.vue";
export default {
  components:{
    'loadingCircle': LoadingCircle,
  },
  setup() {
    const email = ref();
    const toast = useToast();
    const isLoading = ref();

    const submit = async () => {
      if(!isEmail(email.value)){
        toast.error("Email không đúng định dạng");
        return;
      }
      try {
        isLoading.value = true;
        await authService.verifyEmailResetPassword(email.value);
        toast.success('Đã gửi mail đến ' + email.value + '. Vui lòng vào email để xác nhận');
        email.value = '';
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        if(error.response.status === 400){
          toast.error('Email này chưa được đăng ký tài khoản!');
        }
        console.log(error);
      }

    }
    return { email, submit, isLoading};
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
  height: 300px;
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
  font-size: 18px;
}
</style>
