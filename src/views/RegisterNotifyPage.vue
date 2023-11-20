<template>
  <q-page> 
    <section class="notify">
      <q-icon class="icon" name="check_circle"></q-icon>
      <h2>Bạn đã đăng ký thành công. Vui lòng vào email: {{ route.params.email }} để xác thực. Cảm ơn!</h2>
    </section>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    
    return {
      route,
    };
  },
};
</script>

<style scoped>

.icon{
  padding-top: 100px;
  font-size: 100px;
  display: block;
  margin: 0 auto;
  color: green;
}


h2{
  text-align: center;
}
</style>
