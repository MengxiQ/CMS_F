import request from '@/utils/request'

// export function gather(ip) {
//   return request({
//     url: 'detail/config/gather',
//     method: 'get',
//     params: {
//       ip
//     }
//   })
// }

// export function getinterfacesConfigByIP(ip) {
//   return request({
//     url: 'detail/config/interfaces',
//     method: 'get',
//     params: {
//       ip
//     }
//   })
// }
/**
 * 通用接口
 * **/
export function getCommonInterfaces(ip) {
  return request({
    url: 'detail/config/interfaces/common',
    method: 'get',
    params: {
      ip
    }
  })
}
export function updateCommonInterface(data) {
  return request({
    url: 'detail/config/interfaces/common',
    method: 'put',
    data
  })
}
export function createCommonInterface(data) {
  return request({
    url: 'detail/config/interfaces/common',
    method: 'post',
    data
  })
}
export function deleteCommonInterface(data) {
  return request({
    url: 'detail/config/interfaces/common',
    method: 'delete',
    data
  })
}
/**
 * 以太接口
 * **/
export function getEthernetInterfaces(ip) {
  return request({
    url: 'detail/config/interfaces/ethernet',
    method: 'get',
    params: {
      ip
    }
  })
}
export function createEthernetInterface(data) {
  return request({
    url: 'detail/config/interfaces/ethernet',
    method: 'post',
    data
  })
}
export function deleteEthernetInterface(data) {
  return request({
    url: 'detail/config/interfaces/ethernet',
    method: 'delete',
    data
  })
}
/**
 * Eth-trunk接口
 * **/
export function getEthTrunkInterfaces(ip) {
  return request({
    url: 'detail/config/interfaces/eth_trunk',
    method: 'get',
    params: {
      ip
    }
  })
}
export function createEthTrunkInterface(data) {
  return request({
    url: 'detail/config/interfaces/eth_trunk',
    method: 'post',
    data
  })
}
export function deleteEthTrunkInterface(data) {
  return request({
    url: 'detail/config/interfaces/eth_trunk',
    method: 'delete',
    data
  })
}
/**
 * TrunkMemberIf接口成员
 * **/
export function getEthTrunkMember(ip) {
  return request({
    url: 'detail/config/interfaces/eth_trunk/trunk_member',
    method: 'get',
    params: {
      ip
    }
  })
}
export function createTrunkMember(data) {
  return request({
    url: 'detail/config/interfaces/eth_trunk/trunk_member',
    method: 'post',
    data
  })
}
export function deleteTrunkMember(data) {
  return request({
    url: 'detail/config/interfaces/eth_trunk/trunk_member',
    method: 'delete',
    data
  })
}