// /detail/config/gather

import request from '@/utils/request'

export function gather(ip) {
  return request({
    url: 'detail/config/gather',
    method: 'get',
    params: {
      ip
    }
  })
}

export function getinterfacesConfigByIP(ip) {
  return request({
    url: 'detail/config/interfaces',
    method: 'get',
    params: {
      ip
    }
  })
}
