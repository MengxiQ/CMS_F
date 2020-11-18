import request from '@/utils/request'

export function getOspfAdvance(ip) {
  return request({
    url: '/detail/config/ospf/advance',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createOspfAdvance(data) {
  return request({
    url: '/detail/config/ospf/advance',
    method: 'post',
    data
  })
}

export function deleteOspfAdvance(data) {
  return request({
    url: '/detail/config/ospf/advance',
    method: 'delete',
    data
  })
}
