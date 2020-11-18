<template>
  <div class="tab-container">
    <h1 style="font-size: 18px; color: #6f7180;font-weight: bolder"> 配置详情 &nbsp; [IP ：<span style="color: #3d7ed5">{{ ip }}</span>]</h1>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="" tab-position="left">
      <el-tab-pane :lazy="true" :label="'基本信息'" :name="'base'">
        <keep-alive>
          <base-pane :type="'base'" :ip="ip"/>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="VLAN管理" :name="'vlans'">
        <keep-alive>
          <vlan-pane :ip="ip" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="'接口管理'" :name="'interfaces'">
        <keep-alive>
          <interfaces-pane :type="'interfaces'" :ip="ip" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="OSPF路由" :name="'ospf'">
        <keep-alive>
          <el-tabs>
            <el-tab-pane :lazy="true" label="基本配置">
              <ospf-pane :ip="ip" />
            </el-tab-pane>
            <el-tab-pane :lazy="true" label="高级配置">
              <ospf-advanced-pane :ip="ip" />
            </el-tab-pane>
          </el-tabs>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="'静态路由'" :name="'static_route'">
        <keep-alive>
          <static-route-pane :type="'static_route'" :ip="ip" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :lazy="true" :label="'BGP路由'" :name="'bgp'">
        <keep-alive>
          <bgp-pane :type="'bgp'" :ip="ip" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasePane from '@/views/equipments/detail/basePane/basePane'
import InterfacesPane from '@/views/equipments/detail/components/interfacesPane/interfacesPane'
import VlanPane from '@/views/equipments/detail/components/vlanPane/vlanPane'
import OspfPane from '@/views/equipments/detail/components/ospfPane/ospfPane'
import OspfAdvancedPane from '@/views/equipments/detail/components/ospfAdvancedPane/ospfAdvancedPane'
import StaticRoutePane from '@/views/equipments/detail/components/staticRoutePane/staticRoutePane'
import BgpPane from '@/views/equipments/detail/components/bgpPane/bgpPane'

export default {
  name: 'Tab',
  components: { BgpPane, StaticRoutePane, OspfAdvancedPane, OspfPane, VlanPane, InterfacesPane, BasePane },
  data() {
    return {
      tabMapOptions: [
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
  }
}
</script>

<style scoped>
  .tab-container {
    padding: 10px;
  }
  .detail{
  }
</style>
