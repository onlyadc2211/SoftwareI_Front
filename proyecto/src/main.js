import { createApp } from 'vue'
import App from './App.vue'
import router from './Router/router.js'
import './assets/main.css'

const Endpoint = {
  data() {
    return {
      loginUrl: 'http://localhost:3000/api/login',
    }
  }
}

createApp(App).use(router).mixin(Endpoint).mount('#app')