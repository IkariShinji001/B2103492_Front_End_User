<template>
  <div class="container">
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        size="16px"
        class="pagination"
        v-model="currentPage"
        :max="maxPage"
        :max-pages="6"
        boundary-numbers
        active-color="primary"
        @click="updatePage"
        gutter="md"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Pagination',
  props: {
    maxPage: Number,
    currentPage: Number
  },
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage)
    const maxPage = ref(props.maxPage)

    const updatePage = () => {
      emit('updatePage', currentPage.value)
    }

    return {
      updatePage,
      maxPage,
      currentPage
    }
  }
}
</script>

<style scoped></style>
