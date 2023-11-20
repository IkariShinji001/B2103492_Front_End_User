<template>
  <div class="q-pa-md">
    <q-carousel
      class="carousel"
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      control-color="red"
    >
      <q-carousel-slide
        v-for="(image, i) in images"
        :key="i"
        class="img-carousel rounded-10"
        :name="i+1"
        :img-src="image"
      />
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const slide = ref(1);
    const autoplay = ref(true);
    return {
      slide,
      autoplay,
      images: props.images,
    };
  },
};
</script>

<style scoped>
.img-carousel {
  border-radius: 10px;
  object-fit: contain !important;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
