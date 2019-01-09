import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createStore } from './store'
import { createRouter } from './router'
import ElmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Notification from './components/notification'

import './assets/scss/index.scss'

// components
Vue.use(ElmentUI)
Vue.use(Notification)

export function createApp () {
    const store = createStore()
    const router = createRouter()

    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store}
}
