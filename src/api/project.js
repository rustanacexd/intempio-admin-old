import request from '@/utils/request'

const resourceURL = '/projects/'

export function fetchList(query) {
  return request({
    url: resourceURL,
    method: 'get',
    params: query
  })
}

export function fetchProject(projectCode) {
  return request({
    url: resourceURL + projectCode + '/',
    method: 'get'
  })
}

export function createProject(data) {
  return request({
    url: resourceURL,
    method: 'post',
    data
  })
}

export function updateProject(projectCode, data) {
  return request({
    url: resourceURL + projectCode + '/',
    method: 'put',
    data
  })
}

export function deleteProject(projectCode) {
  return request({
    url: resourceURL + projectCode + '/',
    method: 'delete'
  })
}
