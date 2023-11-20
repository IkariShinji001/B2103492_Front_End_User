 <template>
  <q-page fluid="true" class="wrapper">
    <section class="content-container">
      <span>Oops!</span>
      <div class="content-body">
        <h2>404 - Không tìm thấy trang web</h2>
        <router-link to="/">
          <q-btn class="return-btn"> Về trang chủ</q-btn>
        </router-link>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

span{
  height: auto;
  font-size: 200px;
  font-weight: bold;
  font-family: 'Rubik', sans-serif;
  background-image: url('https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2020/05/02/23-buc-anh-tuyet-dep-gui-den-tu-vu-tru-docx-1588426523158.jpeg');
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-position: center;
  display: flex;
  justify-content: center;
}

.content-body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.return-btn{
  background-color: aliceblue;
  padding: 10px 50px;
  font-size: 20px;
  color: black;
}
</style>
