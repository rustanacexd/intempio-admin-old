import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// Create axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // Request timeout
})

// Request interceptor
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Token ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// Response interceptor
service.interceptors.response.use(
  response => {
    /**
     * The code is non-200 error-free
     */
    const code = response.status
    if (code !== 200) {
      Message({
        message: response.statusText,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: illegal token; 50012: other client logged in; 50014: Token expired;
      if (code === 50008 || code === 50012 || code === 50014) {
        MessageBox.confirm('You have been logged out and can cancel to stay on this page，Or log in again',
          'Confirm logout', {
            confirmButtonText: 're-register',
            cancelButtonText: 'cancel',
            type: 'warning'
          }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// To re-instantiate the vue-router object Avoid bugs
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
