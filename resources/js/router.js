import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Main/HomeComponent.vue')
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('./components/Main/CabinetComponent.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('x_xsrf_token')

  if (!token) {
    if (to.name === 'user.login' || to.name === 'user.registration' || to.name === 'home' ||
       to.name === 'password.email'|| to.name === 'password.reset') {
      return next()
    } else {
      return next({
        name: 'user.login'
      })
    }
  }
  if (to.name === 'password.reset' || to.name === 'password.email' || to.name === 'user.login' || to.name === 'user.registration' && token) {
    return next({
      name: 'cabinet'
    })
  }
  if(to.name == 'admin'){
    
  }

  next()
}) 

export default router