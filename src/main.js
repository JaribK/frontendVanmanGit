import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store'
import Vuex from 'vuex';


const app = createApp(App)

app.use(router).use(store).use(Vuex);

app.mount('#app')
