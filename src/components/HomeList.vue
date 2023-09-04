<!-- ExampleComponent.vue -->
<template>
  <div>
    
    <div class="container col-md-8 mx-auto">
      <h1>Latest News Added</h1>
      <br>
        <ul>
          <li v-for="(article, index) in filtered_articles" :key="index">
              <h2>{{ article.title }}</h2>
              <img :src="article.urlToImage" alt="" srcset="">
              <p>{{ article.description }}</p>
              <p><a :href="article.url" target="_blank">read more -></a></p>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  name: 'NewsList',

  setup() {
    // lets define a reactive empty array to store our articles
    const articles = ref([]);
    const API_KEY = 'a3dce55aedc249f5abf8b93c7ffa5b46';
    const api_url = `https://newsapi.org/v2/everything?q=Apple&from=2023-08-28-04&sortBy=popularity&apiKey=${API_KEY}`;
    

    // fetch articles (DATA) from the API
    const fetch_articles = async () => {
      try {
        const response = await axios.get(api_url);

        // update the reactive variable with the data tha comes from the API
        articles.value = response.data.articles;

      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    // Fetch news data when the component is mounted
    onMounted(fetch_articles);

    const filtered_articles = computed(() => {
      // Filter the articles array to exclude articles with the title "Removed"
      return articles.value.filter(article => article.title !== '[Removed]');
    });

    // return the 'articles' variable for use in our template
    return {
      articles,
      filtered_articles,
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
