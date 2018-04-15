import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api-token-auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(username) {
  return request({
    url: '/users/' + username + '/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api-auth/logout/',
    method: 'post'
  })
}
