<template>
  <div v-loading="loadingInit">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="dialogEditShow = true">添加进程</el-button>
        <el-button icon="el-icon-refresh" type="success" size="mini" @click="getList">刷新</el-button>
        <!--        <el-button icon="el-icon-view" type="info" size="mini" style="float: right" @click="getList">路由表</el-button>-->
        <!--查看路由是弹出对话框或者新建窗口-->
      </el-col>
    </el-row>
    <divider-info :data-source="dataSource"></divider-info>
    <el-tabs v-if="JSON.stringify(list) !== '[]'" v-model="activeName" type="border-card" @tab-click="handleClickTab">
      <el-tab-pane
        v-for="(item, key) in list"
        :key="key"
        :lazy="true"
        :label="'进程'+ item.processId"
        :name="item.processId"
      >

        <ospf-process :item="item" :ip="ip" @complete="getList" />
        <ospf-area :list="item" :ip="ip" :process-id="item.processId" @complete="getList" />
      </el-tab-pane>
    </el-tabs>
    <el-table v-else :data="[]" />

    <!-- 编辑进程对话框-->
    <el-dialog title="添加OSPF" :visible.sync="dialogEditShow" :before-close="beforCloseDialog">
      <el-form label-position="left" label-width="100px">
        <el-form-item
          v-for="(item, key) in params"
          :key="key"
          style="position: relative; padding: 10px 0 20px 0"
          :label="item.name"
          size="medium"
        >
          <div style="position: absolute;z-index: 100;top: -28px; font-size: smaller; color: #5a5e66">{{ item.remark }}
            <span style="margin-left: 5px;color: #3d7ed5">({{ item.constraint }})</span></div>
          <el-input v-model="temp[item.name]" />
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24" style="text-align: right">
          <el-button type="primary" size="mini" @click="handleSave()">保存</el-button>
          <el-button type="" size="mini" @click="dialogEditShow = !dialogEditShow">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>

<script>
import { getOspf } from '@/api/detail/ospf/ospf'
import { createOspfProcess, getOspfProcess } from '@/api/detail/ospf/ospfProcess'
import { isArray } from '@/utils/isType'
import OspfProcess from '@/views/equipmentsManage/detail/components/configuration/components/route/ospf/ospfPane/componements/ospfProcess'
import OspfArea from '@/views/equipmentsManage/detail/components/configuration/components/route/ospf/ospfPane/componements/ospfArea'
import DividerInfo from '@/views/equipmentsManage/detail/components/configuration/components/Mixin/divider-info'
export default {
  name: 'OspfPane',
  components: { DividerInfo, OspfArea, OspfProcess },
  props: {
    ip: {
      type: String
    }
  },
  data() {
    return {
      list: [],
      ativeItem: {},
      activeName: '',
      dialogEditShow: false,
      params: [],
      temp: {},
      loadingInit: true,
      dataSource: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    isArray(o) {
      // console.log(isArray(0))
      return isArray(o)
    },
    handleSave() {
      const data = {
        ip: this.ip,
        data: this.temp,
        source: this.$store.getters.source
      }
      createOspfProcess(data).then(res => {
        this.$message({ type: 'success', message: '配置成功。' })
        this.getList()
        this.dialogEditShow = false
      }).catch(error => {
        this.$message({ type: 'error', message: error.response.data['msg'] })
      })
    },
    beforCloseDialog() {
      this.dialogEditShow = false
    },
    getProcessParams(data) {
      // console.log('prams', data)
      this.params = Object.assign({}, data)
    },
    handleClickTab(tab, event) {
      // console.log(tab, event)
    },
    getListError(error) {
      console.log(error)
      // console.log(error.response)
      // 尝试获取后台报错信息
      if (((error.response || {}).data || {}).msg) {
        const data = error.response.data
        // console.log(data.msg)
        if (data.msg.match('candidate data store does not exist.') !== null) {
          // 候选数据没有创建
          this.list = []
          this.dataSource = this.$store.getters.source
          this.$message({ type: 'info', message: '开始配置并创建candidate数据库.' })
        } else {
          this.$message({ type: 'error', message: data.msg })
        }
      } else {
        // 获取不到后台报错信息
        this.$message({ type: 'error', message: ' 请求失败，请尝试刷新.' })
      }
      // 关闭加载提示
      this.loadingInit = false
    },
    getList() {
      this.list = []
      this.loadingInit = true
      // const promiseArr = [
      const query = {
        ip: this.ip,
        source: this.$store.getters.source
      }
      getOspf(query).then(res => {
        if (res.data) {
          if (isArray(res.data.ospfv2.ospfv2comm.ospfSites.ospfSite)) {
            this.list = res.data.ospfv2.ospfv2comm.ospfSites.ospfSite
          } else {
            this.list = Array(res.data.ospfv2.ospfv2comm.ospfSites.ospfSite)
          }
          this.activeName = this.list[0].processId
          this.loadingInit = false
          this.dataSource = query.source
        }
      }).catch(error => this.getListError(error))
      getOspfProcess(query).then(res => {
        this.params = res.params
        this.loadingInit = false
      }).catch(errpr => this.getListError(errpr))
    }
  }
}
</script>

<style scoped>

.label-h5 {
  border-left: solid #3d7ed5 4px;
  padding-left: 4px;
}
</style>
