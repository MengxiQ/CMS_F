import request from '@/utils/request'

export function getSatic_route(ip) {
  return request({
    url: '/detail/config/static_route',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createSatic_route(data) {
  return request({
    url: '/detail/config/static_route',
    method: 'post',
    data
  })
}

export function deleteSatic_route(data) {
  return request({
    url: '/detail/config/static_route',
    method: 'delete',
    data
  })
}

