<!-- ExampleComponent.vue -->
<template>
  <div>
    
    <div class="container col-md-8 mx-auto">
      <h1>Latest News Added</h1>
      <br>
      <LoadingSpinner v-if="isSpinnerLoading"/>
      <SearchInput :searchTerm="searchTerm" @search="doSearch" />
        <ul>
          <li v-for="(article, index) in pagination_articles" :key="index">
              <h2>{{ article.title }}</h2>
              <img :src="article.urlToImage" alt="" srcset="">
              <p>{{ article.description }}</p>
              
              <!--I added index as parameter because the JSON format did not contain ID field-->
              <RouterLink :to="{ name: 'article', params: { id: index } }">read more -></RouterLink>
          </li>
        </ul>

      <div class="pagination">
        <button class="btn btn-light" @click="previous_page" :disabled="current_page === 1">Previous</button>
        <span>{{ current_page }} / {{ total_page }}</span>
        <button class="btn btn-light" @click="next_page" :disabled="current_page === total_page">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import SearchInput from './SearchInput.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'NewsList',
  components: {
    SearchInput,
    LoadingSpinner,
  },

  setup() {
    // lets define a reactive empty array to store our articles
    const articles = ref([]);
    const searchTerm = ref('');
    const API_KEY = 'a3dce55aedc249f5abf8b93c7ffa5b46';
    const api_url = `https://newsapi.org/v2/everything?q=Apple&from=2023-08-28-04&sortBy=popularity&apiKey=${API_KEY}`;

    const current_page = ref(1);
    const article_per_page = 10;
    // i puted the totale page into computed property to calculate the totale page every time the data has new changes.
    const total_page = computed(()=> Math.ceil(articles.value.length / article_per_page));

    const isSpinnerLoading = ref(true);
    

    // fetch articles (DATA) from the API
    const fetch_articles = async () => {
      try {
        const response = await axios.get(api_url);

        // update the reactive variable with the data tha comes from the API
        articles.value = response.data.articles;

        // set the isSpinnerLoading to false after data is loaded
        isSpinnerLoading.value = false;

      } catch (error) {
        console.error('Error fetching articles:', error);
        isSpinnerLoading.value = false;
      }
    };

    // Fetch news data when the component is mounted
    onMounted(fetch_articles);

    const filtered_articles = computed(() => {
      // Filter the articles array to exclude articles with the title "Removed"
      return articles.value.filter(article => article.title !== '[Removed]');
    });

    // pagination functions
    const pagination_articles = computed(() => {
      const start = (current_page.value -1) * article_per_page;
      const end = start + article_per_page;
      return articles.value
      .filter(article => article.title !== '[Removed]')
      // Add filtering based on searchTerm
      .filter(article => article.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
      .slice(start, end);
    });

    const next_page = () => {
        if(current_page.value < total_page.value) {
          current_page.value++;
        }
    };

    const previous_page = () => {
      if(current_page.value > 1) {
          current_page.value--;
        }
    };


    const doSearch = (newSearchTerm) => {
    searchTerm.value = newSearchTerm; // Update the searchTerm in the parent component
  }

    // return the 'articles' variable for use in our template
    return {
      articles,
      filtered_articles,
      current_page,
      total_page,
      pagination_articles,
      previous_page,
      next_page,
      searchTerm,
      doSearch,
      isSpinnerLoading
    };

  },

}
</script>

<style>
.container img {
  width: 50%;
  margin: 1rem 0 1rem;
}
</style>
