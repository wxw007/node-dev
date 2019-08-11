import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import Edit from './views/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/layout/home'
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
        },
        {
          path: '/layout/detail/:articleId',
          name: 'Detail',
          component: Detail,
        },
        {
          path: '/layout/edit',
          name: 'Edit',
          component: Edit,
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
