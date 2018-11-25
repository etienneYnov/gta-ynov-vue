import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'
import WelcomePage from '@/components/WelcomePage'
import SaisieHoraire from '@/components/SaisieHoraire'
import DemandesHoraire from '@/components/DemandesHoraire'
import AgendaForm from '@/components/AgendaForm'
import allUsers from '@/components/allUsers'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'WelcomePage',
      component: WelcomePage
    },
    {
      path: '/HelloWorld/:name',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/saisieHoraire',
      name: 'saisieHoraire',
      component: SaisieHoraire,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/DemandesHoraire',
      name: 'DemandesHoraire',
      component: DemandesHoraire,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/dashboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/AgendaForm',
      name: 'AgendaForm',
      component: AgendaForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/allUsers',
      name: 'allUsers',
      component: allUsers,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin === 1) {
          next()
        } else {
          next({name: 'userboard'})
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({name: 'userboard'})
    }
  } else {
    next()
  }
})

export default router
