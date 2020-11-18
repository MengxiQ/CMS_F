<template>
  <div>
    <pane :title="'系统信息'" @reload="getList">
      <div v-loading="loadingInit">
       <ul class="content">
         <li><span class="label">系统名称：</span><span class="value">{{ list.sysName }}</span></li>
         <li><span class="label">产品型号：</span><span class="value">{{ list.productName }}</span></li>
         <li><span class="label">mac地址：</span><span class="value">{{ list.mac }}</span></li>
         <li><span class="label">系统版本：</span><span class="value">{{ list.platformVer }}</span></li>
         <li><span class="label">esn：</span><span class="value">{{ list.esn }}</span></li>
         <li><span class="label">位置：</span><span class="value">{{ list.sysLocation }}</span></li>
         <li><span class="label">系统时间：</span><span class="value">{{ timestampToTime(list.sysGmtTime) }}</span></li>
         <li><span class="label">开机时长：</span><span class="value">{{ formatSeconds(list.sysUpTime) }}</span></li>
         <li><span class="label">系统描述：</span><span class="value">{{ list.sysDesc }}</span></li>
       </ul>
      </div>
    </pane>
  </div>
</template>

<script>
import Pane from '@/components/pane/pane'
import { monitoringMixin } from '@/views/equipments/detail/basePane/monitoring/componements/mixins/monitoringMixin'
import { getSystemInfo } from '@/api/detail/monitoring/monitoring'
import { formatSeconds, timestampToTime } from '@/utils/time-tool'

export default {
  name: 'SystemInfo',
  components: { Pane },
  mixins: [monitoringMixin],
  methods: {
    formatSeconds(value) {
      return formatSeconds(value)
    },
    timestampToTime(e) {
      return timestampToTime(e)
    },
    getList() {
      this.loadingInit = true
      getSystemInfo(this.ip).then(res => {
        console.log(res)
        this.list = res.data.system.systemInfo
        this.loadingInit = false
      }).catch(error => this.getListError(error))
    }
  }
}
</script>

<style scoped>
  ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
  }
  li {
  margin-bottom: 10px;
  display: inline-block;
  width: 100%;
}
</style>
