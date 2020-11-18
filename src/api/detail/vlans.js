import request from '@/utils/request'

export function getVlans(ip) {
  return request({
    url: '/detail/config/vlans',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createVlans(data) {
  return request({
    url: '/detail/config/vlans',
    method: 'post',
    data
  })
}

export function deleteVlans(data) {
  return request({
    url: '/detail/config/vlans/' + data.vlanId,
    method: 'delete',
    data
  })
}

