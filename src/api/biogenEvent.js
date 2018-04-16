import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/biogen-events/',
    method: 'get',
    params: query
  })
}

export function fetchEvent(eventId) {
  return request({
    url: '/biogen-events/' + eventId + '/',
    method: 'get'
  })
}

export function createEvent(data) {
  return request({
    url: '/biogen-events/',
    method: 'post',
    data
  })
}

export function updateEvent(eventId, data) {
  return request({
    url: '/biogen-events/' + eventId + '/',
    method: 'put',
    data
  })
}

export function deleteEvent(eventId) {
  return request({
    url: '/biogen-events/' + eventId + '/',
    method: 'delete'
  })
}
