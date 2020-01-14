import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'products',
      component: require('@/components/Home').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
