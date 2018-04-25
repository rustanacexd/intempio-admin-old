import request from '@/utils/request'

const resourceURL = '/projects/'

export function fetchProjects(query) {
  return request({
    url: resourceURL,
    method: 'get',
    params: query
  })
}

export function fetchProject(id) {
  return request({
    url: resourceURL + id + '/',
    method: 'get'
  })
}

export function fetchProjectByProjectCode(projectCode) {
  return request({
    url: '/project/' + projectCode + '/',
    method: 'get'
  })
}

export function fetchProjectCodes(query) {
  return request({
    url: resourceURL + 'project_codes/',
    method: 'get',
    params: query
  })
}

export function createProject(data) {
  return request({
    url: resourceURL,
    method: 'post',
    data
  })
}

export function updateProject(id, data) {
  return request({
    url: resourceURL + id + '/',
    method: 'put',
    data
  })
}

export function deleteProject(id) {
  return request({
    url: resourceURL + id + '/',
    method: 'delete'
  })
}
