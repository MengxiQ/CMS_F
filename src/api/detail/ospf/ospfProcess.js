import request from '@/utils/request'

export function getOspfProcess(ip) {
  return request({
    url: '/detail/config/ospf/process',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createOspfProcess(data) {
  return request({
    url: '/detail/config/ospf/process',
    method: 'post',
    data
  })
}

export function deleteOspfProcess(data) {
  return request({
    url: '/detail/config/ospf/process',
    method: 'delete',
    data
  })
}
