import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store'

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
