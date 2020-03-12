import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import cookbook from '../views/cookbook'
import recipe from '../components/recipe'
import addRecipe from '../components/addRecipe'
import changeRecipe from '../components/changeRecipe'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: login
  },
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      guest: true
    }
  },
  {
    path: '/cookbook',
    name: 'cookbook',
    component: cookbook,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:id',
    name: 'recipe',
    props: true,
    component: recipe,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cookbook/create',
    name: 'addRecipe',
    props: true,
    component: addRecipe,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:id/change',
    name: 'changeRecipe',
    props: true,
    component: changeRecipe,
    meta: {
      requiresAuth: true
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user-token') == null) {
      next({
        path: '/',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next({name: cookbook})
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('user-token') == null) {
      next()
    } else {
      next({name: cookbook})
    }
  } else {
    next()
  }
});

export default router
