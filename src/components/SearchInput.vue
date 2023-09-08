<template>
    <div class="col-md-8 mx-auto py-4">
        <input v-model="searchTerm" @input="search" type="text" placeholder="Filter articles" class="form-control">
    </div>
</template>


<script>
import { ref, watch } from 'vue';

export default {
  name: 'SearchInput',
  components: {
    
  },
  props: {
    initialSearchTerm: String, // pass an initial search term as a prop to share it within the parent component
  },

  setup(props, {emit} ) {

    const searchTerm = ref(props.initialSearchTerm || '')

    // Watch for changes to the search term and emit an event
    watch(searchTerm, (newTerm) => {
      emit('search', newTerm);
    });


    return {
        searchTerm,
    }
  } 

}
</script>