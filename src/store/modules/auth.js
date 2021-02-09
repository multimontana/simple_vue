import axios from 'axios'

const qs = require('query-string')

export const auth = {
  state: {
    authorization: false,
    login: false,
    user: {},
    token: document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))[2] : ''
  },
  mutations: {
    UPDATE_LOGIN (state, payload) {
      state.login = payload
    },
  },
  actions: {
    async loginUserAction (context, data) {
      try {
        const response = await axios.post('login', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        if (response.data) {
          const token = response.data.access_token
          const type = '_token'
          const date = new Date()
          date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
          const expires = date.toUTCString()
          document.cookie = `${type} = ${token}; expires = ${expires}; path=/`
          return response.data
        }
        return { success: false }
      } catch (e) {
        console.log(e)
      }
    },
    async registerUserAction (context, data) {
      try {
        const response = await axios.post('register', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        if (response.data.success) {
          const token = response.data.access_token
          const type = '_token'
          const date = new Date()
          date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
          const expires = date.toUTCString()
          document.cookie = `${type} = ${token}; expires = ${expires}; path=/`
          return response.data
        }
        return { success: false }
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
  }
}
