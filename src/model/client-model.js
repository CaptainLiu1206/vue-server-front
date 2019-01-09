import Axios from 'axios'
import Cookies from 'js-cookie'
import { Notify } from 'element-ui'

const getId = () => {
    if (Cookies.get('user')) {
        return JSON.parse(Cookies.get('user')).id
    } else {
        return ''
    }
}

const createError = (code, msg) => {
    const err = new Error(msg)
    err.code = code
    return err
}

const request = Axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true
})

request.interceptors.request.use(config => {
    if (getId()) {
        config.headers['Authorization'] = getId()
    }
    return config
})

const handleRequest = request => {
    return new Promise((resolve, reject) => {
        request.then(resp => {
            const data = resp.data
            if (!data) {
                reject(createError(400, 'no data'))
            }
            if (!data.success) {
                reject(createError(400, data.message))
            }
            resolve(resp.data)
        }).catch(err =>{
            const resp = err.response
            if (resp && resp.status === 401) {
                reject(createError(401, 'need login'))
            } else {
                reject(createError(500, 'server busy'))
            }
        })
    })
}

export default {
    register (payload) {
        return handleRequest(request.post('/user', payload))
    },
    login (payload) {
        return handleRequest(request.post('/user/login', payload))
    },
    fetchUserInfo (id) {
        return handleRequest(request.get(`/user/${id}`))
    }
}
