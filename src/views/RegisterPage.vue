<template>
  <q-page>
    <div class="container">
    </div>
    <section class="form shadow-8">
        <h1>Đăng ký</h1>
        <register-form></register-form>
    </section>
  </q-page>
</template>

<script>
import { ref } from "vue";
import RegisterForm from "../components/RegisterForm.vue";
export default {
  components: {
    "register-form": RegisterForm,
  },
  setup() {
    const isLoading = ref();

    return {
      isLoading,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  text-align: center;
  font-weight: bold;
}

.container{
  padding-top: 10px;
  padding-bottom: 100px;
}

.form {
  background-color: white;
  margin: 0 auto;
  width: 900px;
  padding-bottom: 20px;
}
</style>
