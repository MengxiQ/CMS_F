<template>
  <div class="tab-container">
    <el-tag>ip ：{{ ip }}</el-tag>
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" tab-position="left">
      <el-tab-pane :label="'基本信息'" :name="'base'">
        <keep-alive>
          <base-pane :type="'base'" :ip="ip" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :label="'接口管理'" :name="'interfaces'">
        <keep-alive>
          <interfaces-pane :type="'interfaces'" :ip="ip" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasePane from '@/views/equipments/detail/components/basePane'
import InterfacesPane from '@/views/equipments/detail/components/interfacesPane'

export default {
  name: 'Tab',
  components: { InterfacesPane, BasePane },
  data() {
    return {
      tabMapOptions: [
        { label: '基本信息', key: 'base' },
        { label: '设备管理', key: 'manage' },
        { label: '接口管理', key: 'interfaces' },
        { label: '以太网交换', key: 'ethernet' },
        { label: 'IP路由', key: 'ip_router' },
        { label: 'IP业务', key: 'ip_service' },
        { label: 'IP组播', key: 'ip_multisim' },
        { label: 'MPLS', key: 'mpls' },
        { label: 'VPN', key: 'vpn' },
        { label: 'VXLAN', key: 'vxlan' },
        { label: 'EVN', key: 'evn' },
        { label: '可靠性', key: 'reliability' },
        { label: '安全', key: 'security' },
        { label: 'QoS', key: 'qos' }
      ],
      activeName: 'base',
      createdTimes: 0
    }
  },
  computed: {
    ip() {
      return this.$route.params.ip
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
