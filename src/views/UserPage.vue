<template>
  <q-layout view="lhh Lpr lFf">
    <q-page>
      <div class="wrapper">
        <div class="container row justify-between">
          <div class="sidebar col-md-3">
            <h5 class="label-sidebar">Tài khoản</h5>
            <ul>
              <router-link to="/user/profile">
                <li>
                  <div>Thông tin tài khoản</div>
                </li>
              </router-link>

              <router-link to="/user/orders">
                <li>
                  <div>Lịch sử mua hàng</div>
                </li>
              </router-link>

              <router-link to="/user/notification">
                <li>
                  <div>Thông báo</div>
                </li>
              </router-link>
            </ul>
          </div>

          <div class="col-md-9 main-infor">
            <q-page-container>
              <router-view></router-view>
            </q-page-container>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  padding-top: 20px;
}
.container {
  width: 95%;
  margin: 0 auto;
}

.sidebar {
  background-color: white;
  padding: 0 20px;
  height: max-content;
  padding-bottom: 40px;
  border-radius: 20px;
}

.main-infor {
  background-color: white;
  width: 70%;
  height: fit-content;
  max-height: 700px;
}

a{
  text-decoration: none;
  font-size: 20px;
  color: black;
}

a:hover{
  color: #c92127;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
  border-top: 1px solid #cccccc;
}

.label-sidebar {
  color: #c92127;
  font-weight: bold;
}
</style>
