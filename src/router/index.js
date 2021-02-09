// eslint-disable-next-line no-unused-vars
import { Router, createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Dashboard from '../views/Dashboard'
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },


]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

router.beforeEach((to, from, next) => {
  let currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const match = document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))
  // eslint-disable-next-line prefer-const
  currentUser = match ? match[0].trim().slice(7, match[0].trim().length) : null
  if (!currentUser && requiresAuth) {
    next('/login')
  } else {
    next()
  }
})
export default router
