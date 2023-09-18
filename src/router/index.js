import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingleArticle from '../components/SingleArticle.vue'
import AddArticleForm from '../components/AddArticleForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-new',
      name: 'AddArticleForm',
      component: AddArticleForm
    },
    {
      path: '/article/:id',
      name: 'article',
      component: SingleArticle,
      props: true
    }
  ]
})

export default router
