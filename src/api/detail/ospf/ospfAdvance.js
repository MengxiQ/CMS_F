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

export function getOspfDefaultAdvise(ip) {
  return request({
    url: '/detail/config/ospf/defaultAdvise',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createOspfDefaultAdvise(data) {
  return request({
    url: '/detail/config/ospf/defaultAdvise',
    method: 'post',
    data
  })
}
