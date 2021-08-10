import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/components/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/city',
    name: 'Weather per City',
    component: () => import('../components/Weather.vue')
  },
  {
    path: '/random',
    name: 'Random',
    component: () => import('../components/Random.vue')
  },
  {
    path: '/city/:id',
    name: 'City-Detail',
    component: () => import('../components/Weather.vue')
  },

  {
    path: '/sitemap',
    name: '',
    component: () => import('../components/Sitemap.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
