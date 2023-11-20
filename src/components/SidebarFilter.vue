<template>
  <div class="side-bar">
    <h4>Lọc theo</h4>
    <q-separator />
    <h5>Giá</h5>
    <div class="q-pa-md q-pb-lg range">
      <q-range
        class="input-range"
        v-model="priceOption"
        :min="0"
        :max="500000"
        :step="10000"
        :left-label-value="
          new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(priceOption.min)
        "
        :right-label-value="
          new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(priceOption.max)
        "
        label-always
        thumb-size="25px"
        color="primary"
      ></q-range>

      <div class="row">
        <q-input
          type="number"
          class="col-md-5 input"
          outlined
          label="Min"
          v-model.number="priceOption.min"
        />
        <div class="col-md-2 separate">-</div>
        <q-input
          type="number"
          class="col-md-5 input"
          outlined
          label="Max"
          v-model.number="priceOption.max"
        />
      </div>
    </div>
    <q-separator />
    <h5>Thể loại</h5>
    <div v-for="genre in genres" :key="genre.id">
      <q-checkbox v-model="genre.checked" :label="genre.type"></q-checkbox>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref, watchEffect } from "vue";
import GenresService from "../services/genres.service";

export default {
  setup(props, { emit }) {
    const genres = ref();
    const selectedGenres = ref([]);
    const priceOption = ref({
      min: 0,
      max: 0,
    });
    onBeforeMount(async () => {
      const data = await GenresService.getAllGenres();
      genres.value = data.map((genre) => ({ ...genre, checked: false }));
    });

    watchEffect(() => {
      if (genres.value) {
        selectedGenres.value = genres.value.filter((genre) => genre.checked);
        selectedGenres.value = selectedGenres.value.map((genre) => genre._id);
        emit("updateSelectedGenres", selectedGenres.value);
      }
      emit("updatePriceOption", priceOption.value);
    });

    return {
      genres,
      priceOption,
    };
  },
};
</script>

<style scoped>
.side-bar {
  padding: 0 30px;
  background-color: white;
  height: auto;
}

h4 {
  color: brown;
  font-weight: bold;
}

.range {
  padding-bottom: 50px;
}

.input {
  font-size: 18px;
}
h5 {
  margin: 20px 0;
}
.separate {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
}
</style>
