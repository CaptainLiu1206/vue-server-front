import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { name: 'Home', path: '/home', component: () => import('../views/home.vue') },
            { name: 'Login', path: '/login', component: () => import('../views/login.vue') },
            { path: '/', redirect: '/home'}
        ]
    })
}
  