<template>
  <q-page> 
    <section class="notify">
      <q-icon class="icon" name="check_circle"></q-icon>
      <h2>Bạn đã đặt hàng thành công. Đơn hàng sẽ sớm được xét duyệt. Cảm ơn!</h2>
    </section>
  </q-page>
</template>

<script>
export default {
  setup() {
    
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
