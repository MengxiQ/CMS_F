import request from '@/utils/request'

export function getOspf(query) {
  return request({
    url: '/detail/config/ospf',
    method: 'get',
    params: query
  })
}
