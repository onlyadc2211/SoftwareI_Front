import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/login.vue'
import NotFound from '../view/NotFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: NotFound
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
    {
      name: 'Gestion de trabajadores',
      path: '/main/cropManagement/workers',
      component: () => import('../view/workers.vue')
    },
    {
      name: 'Lotes',
      path: '/main/cropManagement/lots',
      component: () => import('../view/lots.vue')
    },
    
  ]
})

export default router