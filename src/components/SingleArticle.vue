<template>
    <div>
        <div class="container pt-5">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
            <RouterLink to="/">Back to News List</RouterLink>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';


export default {
    name: "SingleArticle",
    props: ['id'],

    setup(props) {
    // lets define a reactive empty array to store our articles
    // Store the list of articles its not the best practice but we did not have ID of every single post so we are forced to lead all artricles again
    const articles = ref([]);
    const API_KEY = 'a3dce55aedc249f5abf8b93c7ffa5b46';
    const api_url = `https://newsapi.org/v2/article/${props.id}&apiKey=${API_KEY}`;
    

    // fetch Single articlefrom the API
    const fetch_single_article = async () => {
      try {
        const response = await axios.get(api_url);

        // update the reactive variable with the data tha comes from the API
        // Fetch the article based on the index
        articles.value = response.data.articles;

        // Fetch the article based on the index
        const articleIndex = props.id;
        article.value = articles.value[articleIndex];

      } catch (error) {
        console.error('Error fetching single article:', error);
      }
    };

    const article = ref({});

    // Fetch news data when the component is mounted
    onMounted(fetch_single_article);

    return {
      article,
    };

  },
}
</script>