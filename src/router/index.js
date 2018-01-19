import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import question from '@/components/question'
import HelloWorld from '@/components/HelloWorld'
import uploadImg from '@/components/uploadImg'
import result from '@/components/result'
import loading from '@/components/loading'
import redirect from '@/components/redirect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/question/:test',
      name: 'question',
      component: question
    },
    {
      path: '/uploadImg/:test',
      name: 'uploadImg',
      component: uploadImg
    },
    {
      path: '/result/:test',
      name: 'result',
      component: result
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: redirect
    },
    {
      path: '/loading/',
      name: 'loading',
      component: loading
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
