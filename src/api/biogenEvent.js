import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/biogen-events/',
    method: 'get',
    params: query
  })
}

export function fetchBiogenEvent(eventId) {
  return request({
    url: '/biogen-events/' + eventId + '/',
    method: 'get'
  })
}

export function createBiogenEvent(data) {
  return request({
    url: '/biogen-events/',
    method: 'post',
    data
  })
}

export function updateBiogenEvent(eventId, data) {
  return request({
    url: '/biogen-events/' + eventId + '/',
    method: 'put',
    data
  })
}

export function deleteBiogenEvent(eventId) {
  return request({
    url: '/biogen-events/' + eventId + '/',
    method: 'delete'
  })
}
