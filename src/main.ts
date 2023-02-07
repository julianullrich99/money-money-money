import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

import './index.css'
import { createHead } from '@vueuse/head'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

app.use(pinia).use(head)

app.mount('#app')
