<template>
  <div v-loading="loadingInit" class="pane">
    <h5 class="label-h5">进程信息
      <el-link style="margin-left: 10px" type="primary" @click="handleUpdate">编辑</el-link>
      <el-button style="float: right" size="mini" type="success" @click="getList">刷新</el-button>
    </h5>
     <divider-info :data-source="dataSource"></divider-info>
    <el-row>
      <el-col :span="12"><span class="label">自治系统编号</span>
        <el-input v-if="dialogEditShow" v-model="temp.asNumber" size="mini" class="input-inline" />
        <span v-else class="props">{{ list.asNumber }}</span>
      </el-col>
      <el-col :span="12"><span class="label">状态</span>
        <el-switch
          v-if="dialogEditShow"
          v-model="temp.bgpEnable"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="true"
          inactive-value="false"
        />
        <span v-else class="props">
          <i v-if="list.bgpEnable === 'true'" style="color: rgb(133,206,97)" class="el-icon-success" />
          <i v-else style="color: red" class="el-icon-error" />
          {{ list.bgpEnable === 'true' ? '开' : '关' }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-if="dialogEditShow" :span="24">
        <p style="font-size: smaller; color: #6f7180">tips: bgp启动和关闭需要时间，开启后请等待一会再刷新。（关闭后会清除AS号）</p>
        <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
        <el-button size="mini" type="" @click="dialogEditShow = false ">取消</el-button>
      </el-col>
    </el-row>
    <el-row v-if="list.bgpEnable === 'true'">
      <el-col :span="24">
        <h5 class="label-h5">基本配置</h5>
        <el-tabs>
          <el-tab-pane lazy label="邻居列表">
            <bgp-peer :as-number="list.asNumber" :list="peerList" :ip="ip" :params="peerParams" @createsuccess="getList" />
          </el-tab-pane>
          <el-tab-pane lazy label="网络列表">
            <bgp-network :as-number="list.asNumber" :list="networkList" :ip="ip" :params="networkParams" @createsuccess="getList" />
          </el-tab-pane>
          <el-tab-pane lazy label="路由引入">
            <bgp-import :ip="ip" :params="networkParams" @createsuccess="getList" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { baseMinxin } from '@/views/equipmentsManage/detail/components/configuration/components/Mixin/baseMixin'
import { getBgpBase, createBgpBase, getBgpPeer, getNetworkPeer } from '@/api/detail/bgp/bgp-base'
import BgpPeer from '@/views/equipmentsManage/detail/components/configuration/components/route/bgpPane/componements/bgpPeer'
import { isArray } from '@/utils/isType'
import BgpNetwork from '@/views/equipmentsManage/detail/components/configuration/components/route/bgpPane/componements/bgpNetwork'
import BgpImport from '@/views/equipmentsManage/detail/components/configuration/components/route/bgpPane/componements/bgpImport'
import DividerInfo from '@/views/equipmentsManage/detail/components/configuration/components/Mixin/divider-info'

export default {
  name: 'BgpPane',
  components: { DividerInfo, BgpImport, BgpNetwork, BgpPeer },
  mixins: [baseMinxin],
  data() {
    return {
      bgpVrfs: [],
      peerParams: [],
      networkParams: [],
      importMethod: 1
    }
  },
  computed: {
    peerList() {
      const peers = (((this.bgpVrfs || {}).bgpVrf || {}).bgpPeers || {}).bgpPeer
      if (peers !== undefined) {
        return isArray(peers) ? peers : Array(peers)
      } else return []
    },
    networkList() {
      const routes = (((((this.bgpVrfs || {}).bgpVrf || {}).bgpVrfAFs || {}).bgpVrfAF || {}).networkRoutes || {}).networkRoute
      if (routes !== undefined) {
        return isArray(routes) ? routes : Array(routes)
      } else return []
    }
  },
  methods: {
    getList() {
      this.loadingInit = true
      const query = {
        ip: this.ip,
        source: this.$store.getters.source
      }
      const promiseArr = [
        getBgpBase(query).then(res => {
          // console.log(res)
          this.list = res.data.bgp.bgpcomm.bgpSite
          this.bgpVrfs = res.data.bgp.bgpcomm.bgpVrfs
          // this.loadingInit = false
        }).catch(error => this.getListError(error)),
        getBgpPeer(query).then(res => {
          this.peerParams = res.params
          // this.loadingInit = false
        }).catch(error => this.getListError(error)),
        getNetworkPeer(query).then(res => {
          this.networkParams = res.params
          // this.loadingInit = false
        }).catch(error => this.getListError(error))
      ]
      Promise.all(promiseArr).then(res => {
        this.loadingInit = false
        this.dataSource = query.source
      }
      ).catch(error => {
        console.log(error)
      })
    },
    handleUpdate() {
      this.dialogEditShow = true
      this.temp = Object.assign({}, this.list)
    },
    handleSave() {
      const data = {
        ip: this.ip,
        data: this.temp,
        source: this.$store.getters.source
      }
      createBgpBase(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    }
  }
}
</script>

<style scoped>
.pane {
  background-color: #f9f9f9;
  padding: 4px;
}

.label {
  display: inline-block;
  padding: 20px 10px;
  color: #34363b;
  min-width: 50px;
  font-size: 14px;
}

.label:after {
  content: ':';
}

.props {
  color: #3d7ed5;
  font-size: 14px;
}

.label-h5 {
  display: block;
  border-left: solid #3d7ed5 4px;
  padding: 3px 8px;
  margin: 10px 0px;
}

.input-inline {
  display: inline-block;
  width: 150px;
  height: 50px;
}
</style>
