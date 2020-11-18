import request from '@/utils/request'

export function getOspf(ip) {
  return request({
    url: '/detail/config/ospf',
    method: 'get',
    params: {
      ip
    }
  })
}
