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
      name: 'Login',
      path: '/',
      component: Login
    },
    {
      name: 'Main',
      path: '/main',
      component: () => import('../view/main.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Personas',
      path: '/main/people',
      component: () => import('../view/person.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Main Worker',
      path: '/mainWorker',
      component: () => import('../view/mainWorker.vue'),
      meta: { requiresAuth: true },
    },
    
    {
      name: 'Gestion de cultivos trabajador',
      path: '/main/cropManagementWorker',
      component: () => import('../view/cropManagementWorker.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Cosechas Worker',
      path: '/main/cropManagementWorker/cropsWorker',
      component: () => import('../view/cropsWorker.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Lotes Worker',
      path: '/main/cropManagementWorker/lotsWorker',
      component: () => import('../view/lotsWorker.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Gestion de cultivos',
      path: '/main/cropManagement',
      component: () => import('../view/cropManagement.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Gestion de ventas',
      path: '/main/salesManagement',
      component: () => import('../view/salesManagement.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Ventas',
      path: '/main/salesManagement/sales',
      component: () => import('../view/sales.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Facturas',
      path: '/main/salesManagement/bills',
      component: () => import('../view/bills.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Productos',
      path: '/main/salesManagement/products',
      component: () => import('../view/products.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Gestion de trabajadores',
      path: '/main/cropManagement/workers',
      component: () => import('../view/workers.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Gestion de trabajadores Workers',
      path: '/main/cropManagementWorker/workersWorker',
      component: () => import('../view/workersWorker.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Plagas Worker',
      path: '/main/cropManagementWorker/pestsWorker',
      component: () => import('../view/pestsWorker.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Plagas',
      path: '/main/cropManagement/pests',
      component: () => import('../view/pests.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Lotes',
      path: '/main/cropManagement/lots',
      component: () => import('../view/lots.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Cosechas',
      path: '/main/cropManagement/crops',
      component: () => import('../view/crops.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Agregar lote',
      path: '/main/cropManagement/lots/addLot',
      component: () => import('../view/addLot.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Ver lote worker',
      path: '/main/cropManagementWorker/lotsWorker/lotInfoWorker/:id',
      component: () => import('../view/lotInfoWorker.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'Ver lote',
      path: '/main/cropManagement/lots/lotInfo/:id',
      component: () => import('../view/lotInfo.vue'),
      meta: { requiresAuth: true },
    },
    
    
    
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!token) {
      alert("No esta registrado por favor registrese")
      next({ name: 'Login' });
    } else {
    
      next();
    }
  } else {
    next();
  }
});

export default router