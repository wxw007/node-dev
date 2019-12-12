import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import articalEdit from './views/articalEdit.vue'
import WorkDiary from './views/WorkDiary.vue'
import MyArtical from './views/MyArtical.vue'
import MyCollection from './views/MyCollection.vue'
import Message from './views/Message.vue'
import WxwTest from './views/WxwTest.vue'
import Drag from './views/Drag.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Home,
      redirect: '/home'
    },
    {
      path: '/drag',
      component: Drag,
    },

    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children: [{
          path: '/layout/wxw-test',
          name: 'Home',
          component: WxwTest,
          alias: '/test',
        },
        {
          path: '/layout/message',
          component: Message,
          alias: '/message',
        },
        {
          path: '/layout/home',
          name: 'Home',
          component: Home,
          alias: '/home',
          meta: {
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
          name: 'workDiary',
          component: WorkDiary,
          alias: '/work-diary'
        },
        {
          path: '/layout/my-artical',
          name: 'myArtical',
          component: MyArtical,
          alias: '/my-artical'
        },
        {
          path: '/layout/my-collection',
          name: 'myCollection',
          component: MyCollection,
          alias: '/my-collection'
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