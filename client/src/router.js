import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import Edit from './views/Edit.vue'
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
          alias: '/home'
        },
        {
          path: '/layout/detail/:articleId',
          name: 'Detail',
          component: Detail,
          alias: '/detail'
        },
        {
          path: '/layout/edit',
          name: 'Edit',
          component: Edit,
          alias: '/edit'
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
