import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login
    },
    
  ]
})

export default router