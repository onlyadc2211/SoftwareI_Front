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
      name: 'GestionDeCultivo',
      path: '/cropManagement',
      component: () => import('../view/cropManagement.vue')
    },
    
  ]
})

export default router