<template>
  <header class="row header justify-around">
    <div class="logo col-md-3">
      <router-link to="/">
        <img src="../assets/tgtt.png" />
      </router-link>
    </div>

    <div class="search col-md-5 col-12">
      <q-input
        v-model="searchText"
        outlined
        class="search-input col-md-12"
        type="search"
        label="Tìm kiếm sản phẩm mong muốn"
        clearable
        @keyup.enter="search"
      >
        <template v-slot:prepend>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>

      <search-list-item
        @updateSearchText="updateSearchText"
        :searchText="searchText"
      ></search-list-item>
    </div>

    <div class="col-md-3 row">
      <div class="icon-container">
        <q-icon
          name="notifications"
          class="icon notify-icon material-symbols-outlined"
        ></q-icon>
        <p>Thông báo</p>

        <div class="hide notify notification" v-if="user">
          <q-card>
            <q-card-section>
              <h2 class="text-h6">Thông báo</h2>
            </q-card-section>

            <q-card-section class="notify-container">
              <ul>
                <li v-for="(notification,i) in reverseArray">
                  <div v-if="!notification.isRead && i <=4">
                    <h6 class="notify-title">{{ notification.title }}</h6>
                    <p>{{ notification.message }}</p>
                  </div>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </div>

        <div class="hide notify notification" v-else>
          <q-card>
            <q-card-section>
              <h2 class="text-h6">Thông báo</h2>
              <div>Đăng nhập để xem thông báo</div>
            </q-card-section>

            <q-card-section>
              <div>
                <router-link to="/login">
                  <q-btn class="btn-login">Đăng nhập</q-btn>
                </router-link>
              </div>

              <div>
                <router-link to="/register">
                  <q-btn class="btn-register">Đăng ký</q-btn>
                </router-link>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="icon-container">
        <router-link to="/cart">
          <q-icon name="shopping_cart" class="icon"></q-icon>
        </router-link>
        <p>Giỏ hàng</p>
      </div>
      <div class="icon-container">
        <q-icon name="person" class="icon" v-if="!user"></q-icon>

        <router-link to="/user" v-else="user">
          <q-icon name="person" class="icon"></q-icon
        ></router-link>

        <p>Tài khoản</p>

        <div class="hide notify" v-if="!user">
          <q-card>
            <q-card-section>
              <div>
                <router-link to="/login">
                  <q-btn class="btn-login">Đăng nhập</q-btn>
                </router-link>
              </div>

              <div>
                <router-link to="/register">
                  <q-btn class="btn-register">Đăng ký</q-btn>
                </router-link>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="hide notify" v-else>
          <q-card>
            <q-card-section class="sign-out">
              <div>
                <q-btn @click="signOut" class="btn-login">Đăng xuất</q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useSessionStore } from "../store/sessionStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, computed } from "vue";
import SearchItemList from "./SearchItemList.vue";
import AuthService from "../services/auth.service";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
export default {
  components: {
    "search-list-item": SearchItemList,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const store = useSessionStore();
    const { user } = storeToRefs(store);
    onBeforeMount(() => {
      if (JSON.parse(localStorage.getItem("user"))) {
        store.setUser(JSON.parse(localStorage.getItem("user")));
      }
    });
    const searchText = ref();
    const updateSearchText = (value) => {
      searchText.value = value;
    };

    const search = () => {
      router.push({ path: "/books", query: { search: searchText.value } });
      searchText.value = null;
    };

    const reverseArray = computed(() =>{
      return user.value.notification.reverse().slice(0,5);
    })

    const signOut = async () => {
      try {
        const res = await AuthService.signOut();
        if (res) {
          localStorage.removeItem("user");
          store.setUser(null);
          router.push({ path: "/"});
          toast.success("Đăng xuất thành công");
        }
      } catch (error) {
        console.log(error);
        toast.error("Đăng xuất gặp lỗi");
      }
    };
    return {
      searchText,
      user,
      updateSearchText,
      signOut,
      search,
      reverseArray
    };
  },
};
</script>

<style scoped>
header {
  height: 160px;
}
img {
  width: 250px;
}

.search {
  margin: auto 0;
}

.search-input {
  font-size: 20px;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.icon {
  font-size: 38px;
  color: rgb(95, 93, 92);
  cursor: pointer;
  margin-left: 10px;
}

.icon:hover {
  color: brown;
}

.icon-container {
  margin: auto auto;
}

.notify {
  position: absolute;
  min-width: 300px;
  transform: translateX(-75%);
  z-index: 1000000;
}

.hide {
  display: none;
}

.icon-container:hover > .notify {
  display: block;
}

.notify:hover {
  display: block !important;
}

.btn-login,
.btn-register {
  width: 100%;
  margin: 5px 0;
  font-weight: bold;
}

.btn-login {
  color: white;
  background: rgb(207, 11, 11);
}

.btn-register {
  color: rgb(207, 11, 11);
}

.sign-out {
  width: 100%;
  padding: 30px 10px;
}

.notification {
  min-width: 500px;
}

h6,
p,
h2 {
  margin: 0;
}

ul{
  margin: 0;
  padding: 0;
}

li{
  margin: 3px 0;
  padding: 5px;
  list-style: none;
  border: 1px solid #cccccc;
}

.notify-title{
  color: rgb(129, 11, 11);
}
</style>
