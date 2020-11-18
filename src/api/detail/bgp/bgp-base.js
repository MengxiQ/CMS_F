import request from '@/utils/request'

export function getBgpBase(ip) {
  return request({
    url: '/detail/config/bgp',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createBgpBase(data) {
  return request({
    url: '/detail/config/bgp',
    method: 'post',
    data
  })
}

export function deleteBgpBase(data) {
  return request({
    url: '/detail/config/bgp',
    method: 'delete',
    data
  })
}

export function getBgpPeer(ip) {
  return request({
    url: '/detail/config/bgp/peer',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createBgpPeer(data) {
  return request({
    url: '/detail/config/bgp/peer',
    method: 'post',
    data
  })
}

export function deleteBgpPeer(data) {
  return request({
    url: '/detail/config/bgp/peer',
    method: 'delete',
    data
  })
}

export function getNetworkPeer(ip) {
  return request({
    url: '/detail/config/bgp/network',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createBgpNetwork(data) {
  return request({
    url: '/detail/config/bgp/network',
    method: 'post',
    data
  })
}

export function deleteBgpNetwork(data) {
  return request({
    url: '/detail/config/bgp/network',
    method: 'delete',
    data
  })
}

export function getBgpImportProtocol(ip) {
  return request({
    url: '/detail/config/bgp/import/protocol',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createBgpImportProtocol(data) {
  return request({
    url: '/detail/config/bgp/import/protocol',
    method: 'post',
    data
  })
}

export function deleteBgpImportProtocol(data) {
  return request({
    url: '/detail/config/bgp/import/protocol',
    method: 'delete',
    data
  })
}

export function getBgpImportInstance(ip) {
  return request({
    url: '/detail/config/bgp/import/instance',
    method: 'get',
    params: {
      ip
    }
  })
}

export function createBgpImportInstance(data) {
  return request({
    url: '/detail/config/bgp/import/instance',
    method: 'post',
    data
  })
}

export function deleteBgpImportInstance(data) {
  return request({
    url: '/detail/config/bgp/import/instance',
    method: 'delete',
    data
  })
}

