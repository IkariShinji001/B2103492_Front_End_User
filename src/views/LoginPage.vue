<template>
  <q-page>
    <div class="container">
    </div>
    <section class="form shadow-8">
      <p class="text-h3">Đăng nhập</p>
      <login-form></login-form>
      <div class="row justify-around">
        <p>Bạn chưa là thành viên? <router-link to="/register">Đăng ký ngay</router-link></p>
        <p><router-link to="/forget-password">Quên mật khẩu</router-link></p>
      </div>
 
    </section>
  </q-page>
</template>

<script>

import LoginForm from '../components/LoginForm.vue';
export default{
  components:{
    'login-form': LoginForm
  },setup(){

  }

}

</script>


<style scoped>

p{
  font-weight: bold;
  text-align: center;
}
.form{
  padding-top: 30px;
  margin: 0 auto;
  max-width: 900px;
  background-color: white;
  padding-bottom: 30px;
}

.container{
  padding-top: 50px;
}


</style>
