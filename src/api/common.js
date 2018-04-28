import axios from 'axios'

export function requestBiogenChange(data) {
  return axios.post(
    'https://hooks.zapier.com/hooks/catch/2825524/fqb0pn/',
    JSON.stringify(data)
  )
}
