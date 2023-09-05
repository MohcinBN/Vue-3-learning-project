<!-- ExampleComponent.vue -->
<template>
  <div>
    
    <div class="container col-md-8 mx-auto">
      <h1>Latest News Added</h1>
      <br>
        <ul>
          <li v-for="(article, index) in pagination_articles" :key="index">
              <h2>{{ article.title }}</h2>
              <img :src="article.urlToImage" alt="" srcset="">
              <p>{{ article.description }}</p>
              <p><a :href="article.url" target="_blank">read more -></a></p>
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

export default {
  name: 'NewsList',

  setup() {
    // lets define a reactive empty array to store our articles
    const articles = ref([]);
    const API_KEY = 'a3dce55aedc249f5abf8b93c7ffa5b46';
    const api_url = `https://newsapi.org/v2/everything?q=Apple&from=2023-08-28-04&sortBy=popularity&apiKey=${API_KEY}`;

    const current_page = ref(1);
    const article_per_page = 10;
    // i puted the totale page into computed property to calculate the totale page every time the data has new changes.
    const total_page = computed(()=> Math.ceil(articles.value.length / article_per_page));
    

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

    // pagination functions
    const pagination_articles = computed(() => {
      const start = (current_page.value -1) * article_per_page;
      const end = start + article_per_page;
      return articles.value.slice(start, end);
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

    console.log(total_page.value);

    // return the 'articles' variable for use in our template
    return {
      articles,
      filtered_articles,
      current_page,
      total_page,
      pagination_articles,
      previous_page,
      next_page
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
