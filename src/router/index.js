import { createRouter, createWebHistory } from "vue-router";
import AuthService from "../services/auth.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "Trang chủ",
      },
      component: () => import("../views/HomePageView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      meta: {
        title: "Không tồn tại trang web",
      },
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "Đăng ký",
      },
      component: () => import("../views/RegisterPage.vue"),
    },
    {
      path: "/register/notify/:email",
      name: "registerNotify",
      meta: {
        title: "Đăng ký thành công",
      },
      component: () => import("../views/RegisterNotifyPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Đăng nhập",
      },
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/books",
      name: "books",
      meta: {
        title: "Tìm kiếm"
      },
      component: () => import("../views/BookListPage.vue"),
    },
    {
      path: "/books/:id",
      name: "bookDetail",
      meta: {
        title: "Sách"
      },
      component: () => import("../views/DetailBookPage.vue"),
    },
    {
      path: '/series/:id',
      name: "seriesDetail",
      meta:{
        title: "Bộ truyện"
      },
      component: () => import("../views/DetailSeriesPage.vue"),
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        title: 'Giỏ hàng'
      },
      component: () => import("../views/CartPage.vue"),
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        title: 'Tài khoản',
        requiresAuth: true
      },
      component: () => import("../views/UserPage.vue"),
      children:[
        {
          path: 'profile',
          component: () => import("../views/ProfilePage.vue"),
        },
        {
          path: 'orders',
          component: () => import("../views/OrderHistory.vue"),
        },
        {
          path: 'notification',
          component: () => import("../views/NotificationPage.vue"),
        }
      ]
    },{
      path: '/checkout',
      name: 'checkout',
      meta: {
        title: 'Thanh toán',
        requiresAuth: true
      },
      component: () => import("../views/CheckoutPage.vue"),
    }
    ,{
      path: '/checkout/success',
      name: 'checkoutSuccess',
      meta: {
        title: 'Thanh toán thành công'
      },
      component: () => import("../views/CheckoutSuccessPage.vue"),
    },{
      path: '/forget-password',
      name: 'forgetPassword',
      meta: {
        title: 'Quên mật khẩu'
      },
      component: () => import("../views/ForgetPassword.vue"),
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      meta:{
        title: 'Thiết lập lại mật khẩu'
      },
      component: () => import("../views/ResetPassword.vue"),
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  const isLoginState = await AuthService.verifyAccessToken();
  if (to.meta.requiresAuth && !isLoginState) {
    next("/login");
  } else if (to.path === "/login" && isLoginState) {
    next("/");
  } else {
    document.title = to.meta.title;
    next();
  }
});

router.afterEach(() => {
  // Cuộn trang lên đầu sau khi route đã thay đổi
  window.scrollTo(0, 0);
});

export default router;
