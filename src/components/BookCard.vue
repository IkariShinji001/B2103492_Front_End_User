<template>
  <div :class="class" id="container">
    <div class="image">
      <router-link :to="path" class="container">
        <img :src="book.images[0]" />
        <div class="discount" v-if="book.discount !== 0">
          - {{ book.discount }}%
        </div>
      </router-link>
    </div>
    <div class="info-container">
      <div class="name-container">
        <router-link :to="path" class="container">
          <p :title="book.name + ' Volume ' + book.volume" class="name">
            {{ book.name }} - Volume {{ book.volume }}
          </p>
        </router-link>
      </div>
    </div>

    <div class="price">
      <p class="discount-price">
        {{ new Intl.NumberFormat().format(book.discountPrice) }} đ
      </p>
      <p class="origin-price">
        {{ new Intl.NumberFormat().format(book.price) }} đ
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    class: String,
    book: Object,
  },
  setup(props, { emit }) {
    return {
      class: props.class,
      path: props.path,
      book: props.book,
    };
  },
};
</script>

<style scoped>
#container {
  height: fit-content;
  min-height: max-content;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
}

.container {
  height: auto;
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.info-container {
  width: 80%;
  margin: 0 auto;
}

.price {
  width: 100%;
  padding: 0 30px;
}

.discount-price {
  margin: 0 !important;
  color: #c92127;
  font-size: 20px;
  font-weight: bold;
}

.origin-price {
  font-size: 20px;
  color: #acacac;
  text-decoration: line-through;
}

.name {
  width: 100%;
  padding-top: 0px !important;
  line-height: 1.4em;
  word-break: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.8em;
  max-height: 2.8em;
  color: #333333;
  overflow: hidden;
  font-size: 18px;
  text-align: left;
}

.image {
  display: flex;
  height: auto;
}

img {
  width: 80%;
}

.discount {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: brown;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 20px;
  border-radius: 100%;
  top: 5px;
  right: calc(10% + 5px);
}

a {
  text-decoration: none;
  color: black;
}
</style>
