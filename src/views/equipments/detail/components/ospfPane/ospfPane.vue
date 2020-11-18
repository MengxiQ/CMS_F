<template>
  <div v-loading="loadingInit">
    <el-row style="margin-bottom: 10px">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="dialogEditShow = true">添加进程</el-button>
        <el-button icon="el-icon-refresh" type="success" size="mini" @click="getList">刷新</el-button>
        <el-button icon="el-icon-view" type="info" size="mini" style="float: right" @click="getList">路由表</el-button>
        <!--查看路由是弹出对话框或者新建窗口-->
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClickTab">
      <el-tab-pane
        v-for="(item, key) in list"
        :key="key"
        :lazy="true"
        :label="'进程'+ item.processId"
        :name="item.processId"
      >

        <ospf-process :item="item" :ip="ip" @complete="getList"/>
        <ospf-area :list="item" :ip="ip" :process-id="item.processId" @complete="getList"/>
      </el-tab-pane>
    </el-tabs>

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
          <el-input v-model="temp[item.name]"/>
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
import {getOspf} from '@/api/detail/ospf/ospf'
import {createOspfProcess, getOspfProcess} from '@/api/detail/ospf/ospfProcess'
import {isArray} from '@/utils/isType'
import OspfProcess from '@/views/equipments/detail/components/ospfPane/componements/ospfProcess'
import OspfArea from '@/views/equipments/detail/components/ospfPane/componements/ospfArea'

export default {
  name: 'OspfPane',
  components: {OspfArea, OspfProcess},
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
      loadingInit: true
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
        data: this.temp
      }
      createOspfProcess(data).then(res => {
        this.$message({type: 'success', message: '配置成功。'})
        this.getList()
        this.dialogEditShow = false
      }).catch(error => {
        this.$message({type: 'error', message: error.response.data['msg']})
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
    async getList() {
      this.list = []
      this.loadingInit = true
      const promiseArr = [
        getOspf(this.ip).then(res => {
          if (res.data) {
            if (isArray(res.data.ospfv2.ospfv2comm.ospfSites.ospfSite)) {
              this.list = res.data.ospfv2.ospfv2comm.ospfSites.ospfSite
            } else {
              this.list = Array(res.data.ospfv2.ospfv2comm.ospfSites.ospfSite)
            }
            this.activeName = this.list[0].processId
            // console.log(this.list)
          }
        }).catch(error => {
          console.log(error.response)
          const data = error.response.data
          this.$message({type: 'error', message: data['msg']})
        }),
        getOspfProcess(this.ip).then(res => {
          this.params = res.params
        }).catch(error => {
          console.log(error.response)
        })]
      await Promise.all(promiseArr).then(value => {
        this.loadingInit = false
        // console.log(value)
      }).catch(error => {
        console.log(error)
        this.loadingInit = false
        this.$message({type: 'error', message: '初始化失败，请尝试刷新！'})
      })
    }
  }
}
</script>

<style scoped>
.form-titem-valus {
  color: #6f7180;
  margin-right: 20px;

}

.label-h5 {
  border-left: solid #3d7ed5 4px;
  padding-left: 4px;
}
</style>
