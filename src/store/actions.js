import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import bus from '../utils/bus'
import * as types from './mutation-typs'
import Model from '../model/client-model'

const handleError = err => {
    if (err.code === 401) {
        Message({
            type: 'error',
            message: '请先登录'
        })
        bus.$emit('auth')
    }
}

const actions = {
    fetchUserInfo ({ commit }) {
        return new Promise((resolve, reject) => {
            Model.fetchUserInfo(JSON.parse(Cookies.get('user')).userId).then(data => {
                commit(types.SET_USER, {user: {...data.data}})
                resolve(data)
            }).catch(err =>{
                handleError(err)
                reject(err)
            })
        })
    },
    register ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Model.register(payload).then(resp => {
                const data = resp.data
                delete payload.password
                commit(types.SET_USER, {user: {...data, ...payload}})
                Cookies.set('user', {id: data.id, userId: data.userId, username: payload.username}, { expires: 7 })
                resolve(resp)
            }).catch(err =>{
                handleError(err)
                reject(err)
            })
        })
    },
    login ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Model.login(payload).then(resp => {
                const data = resp.data
                delete payload.password
                commit(types.SET_USER, {user: {...data, ...payload}})
                Cookies.set('user', {id: data.id, userId: data.userId, username: payload.username}, { expires: 7 })
                resolve(resp)
            }).catch(err =>{
                handleError(err)
                reject(err)
            })
        })
    }
}

export default actions
