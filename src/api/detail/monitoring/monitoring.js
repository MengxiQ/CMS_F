import request from '@/utils/request'

export function getAlarmList(ip) {
  return request({
    url: '/detail/config/monitoring/alarm',
    method: 'get',
    params: {
      ip
    }
  })
}

export function getBoardResStates(ip) {
  return request({
    url: '/detail/config/monitoring/boardResStates',
    method: 'get',
    params: {
      ip
    }
  })
}

export function getSystemInfo(ip) {
  return request({
    url: '/detail/config/monitoring/systemInfo',
    method: 'get',
    params: {
      ip
    }
  })
}

export function updateSystemInfo(data) {
  return request({
    url: '/detail/config/monitoring/systemInfo',
    method: 'post',
    data
  })
}

