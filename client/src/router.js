import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import articalEdit from './views/articalEdit.vue'
import WorkDiary from './views/WorkDiary.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/home'
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: '/layout/home',
          name: 'Home',
          component: Home,
          alias: '/home',
          meta:{
            keepAlive: true
          }
        },
        {
          path: '/layout/detail/:id',
          name: 'Detail',
          component: Detail,
          alias: '/detail/:id'
        },
        {
          path: '/layout/artical-edit/:id',
          name: 'articalEdit',
          component: articalEdit,
          alias: '/articaledit/:id'
        },
        {
          path: '/layout/work-diary',
          name: 'WorkDiary',
          component: WorkDiary,
          alias: '/work-diary'
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})
