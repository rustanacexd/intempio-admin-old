import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUsername, removeUsername, setUsername } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    fullname: '',
    avatar: '',
    role: '',
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
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE: (state, role) => {
      state.role = role
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
          commit('SET_ROLE', data.role)
          commit('SET_NAME', data.fullname)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut({ commit }) {
      return new Promise(resolve => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })

        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        removeToken()
        removeUsername()
        resolve()
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        removeUsername()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
