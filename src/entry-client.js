import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'
import Bus from './utils/bus'
import Cookies from 'js-cookie'
import createPersistedState from './store/localStorage'

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

const { app, router, store } = createApp()

Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    },
    beforeRouteEnter (to, from, next) {
        // 如果没有登录直接跳转登录页面
        const userCookie = Cookies.get('user')
        if (userCookie && JSON.parse(userCookie) && JSON.parse(userCookie).id) {
            if (to.path.indexOf('/login') !== -1) {
                let timer = setTimeout(() => {
                    router.push('/home')
                    clearTimeout(timer)
                }, 0)
            }
        } else {
            if (to.path.indexOf('/login') === -1) {
                let timer = setTimeout(() => {
                    router.push({path: '/login', query: { redirect: to.path }})
                    clearTimeout(timer)
                }, 0)
            }
        }
        next()
    }
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
    createPersistedState({store})
}

Bus.$on('auth', () => {
    router.push('/login')
})
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        bar.start()
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                console.log('client promise resolve')
                bar.finish()
                next()
            })
            .catch(() => {
                console.log('client err')
                return next
            })
    })

    app.$mount('#app')
})

// service worker
if ('https' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
}
