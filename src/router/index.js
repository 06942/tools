import { createRouter, createWebHistory } from 'vue-router'
import H2DView from '../views/H2DView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'h2d',
      component: H2DView
    }
  ]
})

export default router
