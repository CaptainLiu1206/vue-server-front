import * as types from './mutation-typs'

const mutations = {
    [types.SET_USER_LIST] (state, payload) {
        console.log(payload)
        state.userList = payload.list
        state.userTotal = payload.total
    },
    [types.SET_USER] (state, payload) {
        state.user = payload.user
    }
}

export default mutations
