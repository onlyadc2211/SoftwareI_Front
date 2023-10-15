import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/*',
      component: 404
    },
    {
      path: '/',
      component: Login
    },
    {
      name: 'Main',
      path: '/main',
      component: () => import('../view/main.vue')
    },
    {
      name: 'Gestion de cultivos',
      path: '/main/cropManagement',
      component: () => import('../view/cropManagement.vue')
    },
    
  ]
})

export default router