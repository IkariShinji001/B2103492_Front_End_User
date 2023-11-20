<template>
  <q-page>
    <div class="wrapper">
      <h4>Thông báo</h4>
      <div class="container">
        <div
          class="row notifi"
          v-for="(notification, i) in notifications"
          :key="i"
        >
          <div>
            <h6>{{ notification.title }}</h6>
            <p>{{ notification.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import userService from "../services/user.service";

export default {
  setup() {
    const notifications = ref();
    onBeforeMount(async () => {
      const res = await userService.getUser();
      notifications.value = res.notification.reverse();
    });

    return {
      notifications,
    };
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  padding: 0 20px;
}

h6 {
  margin: 0;
}

.container{
  height: 570px;
  overflow: scroll;
}

.notifi {
  padding: 5px 0;
  font-size: 16px;
}

.notifi:nth-child(odd) {
  background-color: aliceblue;
}

h6{
  color: #c21;
}

</style>
