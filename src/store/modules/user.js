import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUsername, removeUsername, setUsername } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    fullname: '',
    role: '',
    roles: [],
    username: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.fullname = name
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          setToken(data.token)
          setUsername(username)
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const username = getUsername()
        getInfo(username).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.fullname)
          commit('SET_USERNAME', data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        commit('SET_ROLES', [])
        removeToken()
        removeUsername()
        resolve()
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        commit('SET_ROLES', [])
        removeUsername()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
