  // @ts-nocheck
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/index'
import { useAuthStore } from '@/stores/auth'
import appSetting from '@/app-setting'

import HomeView from '../views/index.vue'

const routes: RouteRecordRaw[] = [
  // dashboard
  { path: '/', name: 'home', component: HomeView },
  { path: '/dashboard', name: 'Dashboard', component: HomeView },

  {
    path: '/menu_aplicacion',
    name: 'menu_aplicacion',
    component: () => import('../views/Menu_aplicacion/Menu_aplicacion.vue')
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/Company/Company.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import('../views/Crud.vue')
  },
    {
    path: '/primevue',
    name: 'primevue',
    component: () => import('../views/PrimeVue.vue')
  },
    {
    path: '/terminal',
    name: 'terminal',
    component: () => import('../views/Terminal/Terminal.vue')
  },

    {
    path: '/components',
    name: 'components',
    component: () => import('../views/Components.vue')
  },
    {
    path: '/componentsprimevue',
    name: 'componentsprimevue',
    component: () => import('../views/ComponentsPrimeVue.vue')
  },
    {
    path: '/templates',
    name: 'templates',
    component: () => import('../views/Templates.vue')
  },
    {
    path: '/vristo',
    name: 'vristo',
    component: () => import('../views/Vristo.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/auth/profile.vue')
  },
  {
    path: '/error404',
    name: 'error404',
    component: () => import('../views/error404.vue'),
    meta: { layout: 'auth' }
  },
  {
    path: '/bloqueo',
    name: 'bloqueo',
    component: () => import('../views/auth/bloqueo.vue'),
    meta: { layout: 'auth' }
  },
    {
    path: '/lock',
    name: 'lock',
    component: () => import('../views/auth/lockScreen.vue'),
    meta: { layout: 'auth' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/error404.vue'),
    meta: { layout: 'auth' }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/cover-login.vue'),
    meta: { layout: 'auth' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  const authStore = useAuthStore();
  const loggedIn = authStore.isAuthenticated;

  // Save the previous route in localStorage if it exists
  if (from.name) {
    localStorage.setItem('previousRoute', JSON.stringify({ ruta: from.name }));
  }

  // Set the main layout based on the route meta
  const requiresAuthLayout = to?.meta?.layout === 'auth';
  store.setMainLayout(requiresAuthLayout ? 'auth' : 'app');

  // Check if the user is allowed to access the route
  if (!loggedIn) {
    // If not authenticated, allow access only to routes with 'auth' layout
    if (requiresAuthLayout) {
      next(); // Allow navigation to routes with the 'auth' layout
    } else {
      next({ name: 'login' }); // Redirect to login for any non-'auth' layout routes
    }
  } else {
    // If authenticated, proceed as usual
    next();
  }
});


router.afterEach((to, from) => {
  appSetting.changeAnimation()
})

export default router
