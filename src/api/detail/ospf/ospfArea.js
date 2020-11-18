import request from '@/utils/request'

export function getOspfArea(ip) {
  return request({
    url: '/detail/config/ospf/area',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createOspfArea(data) {
  return request({
    url: '/detail/config/ospf/area',
    method: 'post',
    data
  })
}

export function deleteOspfArea(data) {
  return request({
    url: '/detail/config/ospf/area',
    method: 'delete',
    data
  })
}
