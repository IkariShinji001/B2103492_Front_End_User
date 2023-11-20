<template>
  <div class="wrapper" :style="isShow ? 'display: flex' : 'display: none'">
    <q-circular-progress
      indeterminate
      size="75px"
      :thickness="0.6"
      color="light-blue-2 "
      center-color="indigo-10"
      class="q-ma-md loading"
    />
  </div>
</template>


<script>

export default{
  name: 'LoadingCircle',
  props:{
    isShow: Boolean
  },
  setup(props){
  }

}
</script>

<style scoped>

.wrapper{
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin-top: -30px;
  z-index: 100;
  background-color: #e3f2fd86!important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading{
  z-index: 10000;
}

</style>