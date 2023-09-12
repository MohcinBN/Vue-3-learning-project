<template>
    <div class="col-md-8 mx-auto py-4">
        <input v-model="localSearchTerm" @input="search" type="text" placeholder="Filter articles" class="form-control">
    </div>
</template>


<script>
import { ref, watch } from 'vue';

export default {
  name: 'SearchInput',
  components: {
    
  },
  props: {
    searchTerm: String, // Pass the searchTerm as a prop
  },

  setup(props, {emit} ) {

    const localSearchTerm = ref(props.searchTerm || '')

    // Watch for changes to the search term and emit an event
    watch(localSearchTerm, (newTerm) => {
      emit('search', newTerm);
    });

    return {
      localSearchTerm,
    };

  } 

}
</script>