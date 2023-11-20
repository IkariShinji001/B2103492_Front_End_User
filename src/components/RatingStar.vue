<template>
   <div class="q-gutter-y-md column">
      <q-rating
        v-model="star"
        max="5"
        size="3em"
        color="orange"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        :readonly="readonly"
        @click="updateStarRating"
      />
   </div>
</template>

<script>
import {ref} from "vue"
export default{
  props:{
    star: Number, default: 0,
    readonly: Boolean,
  },
  setup(props, {emit}){
    const star = ref(props.star);
    const readonly = ref(props.readonly);

    const updateStarRating = () =>{
      emit("updateStarRating", star.value)
    }
  
    return{
      star,
      readonly,
      updateStarRating
    }
  }
}

</script>