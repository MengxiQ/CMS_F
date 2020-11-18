<template>
  <div>
    <el-tabs>
      <el-tab-pane label="通用接口" lazy>
        <common-interfaces :ip="ip"></common-interfaces>
      </el-tab-pane>
      <el-tab-pane label="以太接口" lazy>
        <ethernet-interfaces :ip="ip"></ethernet-interfaces>
      </el-tab-pane>
      <el-tab-pane label="Eth-Trunk" lazy>
        <eth-trunk :ip="ip"></eth-trunk>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import CommonInterfaces from '@/views/equipments/detail/components/interfacesPane/commonInterfaces'
import EthernetInterfaces from '@/views/equipments/detail/components/interfacesPane/ethernetInterfaces'
import EthTrunk from '@/views/equipments/detail/components/interfacesPane/ethTrunk/ethTrunk'
export default {
  name: 'InterfacePane',
  components: { EthTrunk, EthernetInterfaces, CommonInterfaces },
  filters: {
  },
  props: {
    ip: {
      type: String
    }
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
