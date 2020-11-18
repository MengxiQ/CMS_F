import request from '@/utils/request'

export function getOspfAreaNetwork(ip) {
  return request({
    url: '/detail/config/ospf/area/network',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createOspfAreaNetwork(data) {
  return request({
    url: '/detail/config/ospf/area/network',
    method: 'post',
    data
  })
}

export function deleteOspfAreaNetwork(data) {
  return request({
    url: '/detail/config/ospf/area/network',
    method: 'delete',
    data
  })
}
