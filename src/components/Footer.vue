<template>
  <div class="container">
    <footer class="footer">
      <div class="row">
        <div class="logo col-md-4">
          <img src="../assets/tgtt.png" alt="logo" />
          <p>
            <q-icon name="home" class="icon"></q-icon>
            Đường 3/2, phường An Khánh, quận Ninh Kiều, Thành Phố Cần Thơ, Việt
            Nam
          </p>
          <p>
            Thế Giới Tiểu Thuyết nhận đặt hàng trực tuyến và giao hàng tận nơi.
          </p>
        </div>

        <div class="col-md-8">
          <h2>Đối tác vận chuyển</h2>
          <div class="row justify-around">
            <img
              class="col-md-2"
              src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/ahamove_logo3.png"
            />
            <img
              class="col-md-2"
              src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png"
            />
            <img
              class="col-md-2"
              src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh1.png"
            />
            <img
              class="col-md-2"
              src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png"
            />
          </div>

          <h2>Liên hệ</h2>

          <div class="row justify-around contact">
            <div class="col-md-3">
              <p>
                <q-icon name="phone" class="icon"></q-icon>
                <a href="tel:+84912345678">0912 345 678</a>
              </p>
            </div>

            <div class="col-md-5">
              <p>
                <q-icon name="location_on" class="icon"></q-icon>
                <a href="tel:+84912345678">Đường 3/2, Ninh Kiều,TP Cần Thơ</a>
              </p>
            </div>

            <div class="col-md-4">
              <p>
                <q-icon name="mail" class="icon"></q-icon>
                <a href="tel:+84912345678">TGTT@service.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.footer {
  padding: 20px 0;
  border-radius: 10px;
  background-color: white !important;
}
img {
  width: 100%;
}
p {
  margin: 0;
  padding: 5px 30px;
  color: black;
  font-size: 16px;
}

.logo {
  border-right: 1px solid #cccccc;
}

.icon {
  font-size: 25px;
}

h2 {
  font-weight: bold;
  text-align: center;
  font-size: 25px;
  color: black;
}

a {
  text-decoration: none;
  color: black;
}

.contact {
  width: 100%;
}
</style>
