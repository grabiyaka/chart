import './bootstrap' 

import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import axios from 'axios'
// import store from './store'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${location.protocol}//${location.host}/`

axios.interceptors.response.use({}, function (error) {
  if(error.response.status === 401 || error.response.status === 419){
    const token = localStorage.getItem('x_xsrf_token')
    if(token){
      localStorage.removeItem('x_xsrf_token')
      store.commit('setToken', null)
    }
    router.push({name: 'home'})
  }
  return Promise.reject(error);
});

createApp(App)
  .use(router)
//   .use(store)
  .mount('#app')