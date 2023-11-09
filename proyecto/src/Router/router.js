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
      name: 'Main Worker',
      path: '/mainWorker',
      component: () => import('../view/mainWorker.vue')
    },
    
    {
      name: 'Gestion de cultivos trabajador',
      path: '/main/cropManagementWorker',
      component: () => import('../view/cropManagementWorker.vue')
    },
    {
      name: 'Lotes Worker',
      path: '/main/cropManagementWorker/lotsWorker',
      component: () => import('../view/lotsWorker.vue')
    },
    {
      name: 'Gestion de cultivos',
      path: '/main/cropManagement',
      component: () => import('../view/cropManagement.vue')
    },
    {
      name: 'Gestion de ventas',
      path: '/main/salesManagement',
      component: () => import('../view/salesManagement.vue')
    },
    {
      name: 'Ventas',
      path: '/main/salesManagement/sales',
      component: () => import('../view/sales.vue')
    },
    {
      name: 'Facturas',
      path: '/main/salesManagement/bills',
      component: () => import('../view/bills.vue')
    },
    {
      name: 'Productos',
      path: '/main/salesManagement/products',
      component: () => import('../view/products.vue')
    },
    {
      name: 'Gestion de trabajadores',
      path: '/main/cropManagement/workers',
      component: () => import('../view/workers.vue')
    },
    {
      name: 'Plagas',
      path: '/main/cropManagement/pests',
      component: () => import('../view/pests.vue')
    },
    {
      name: 'Lotes',
      path: '/main/cropManagement/lots',
      component: () => import('../view/lots.vue')
    },
    {
      name: 'Cosechas',
      path: '/main/cropManagement/crops',
      component: () => import('../view/crops.vue')
    },
    {
      name: 'Agregar lote',
      path: '/main/cropManagement/lots/addLot',
      component: () => import('../view/addLot.vue')
    },
    {
      name: 'Ver lote',
      path: '/main/cropManagement/lots/lotInfo/:id',
      component: () => import('../view/lotInfo.vue')
    },
    
    
    
  ]
})

export default router