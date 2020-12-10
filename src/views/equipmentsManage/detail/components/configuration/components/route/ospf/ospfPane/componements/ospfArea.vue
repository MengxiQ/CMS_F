<template>
  <div>
    <!--    <h5 class="label-h5">区域列表：-->
    <!--      <el-link type="primary" @click="createInstance('area_params')">新建区域</el-link>-->
    <!--    </h5>-->
    <el-divider content-position="left">区域列表
      <el-link size="mini" type="primary" @click="createInstance('area_params')">新建</el-link>
    </el-divider>
    <el-table
      :data="list.areas ? (isArray(list.areas.area)?list.areas.area:Array(list.areas.area)) : []"
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="background: #f9f9f9; padding: 10px">
            <el-divider content-position="left">
              Network
              <el-link type="primary" @click="createInstance('network_params',props.row)">新建</el-link>
            </el-divider>
            <!--  v-if="props.networks" // 如果区域没添加属性就False-->
            <el-table
              :data="props.row.networks ? (isArray(props.row.networks.network) ? props.row.networks.network:Array(props.row.networks.network)) : []"
              style="border:1px rgb(235,238,245) solid"
            >
              <el-table-column label="ipAddress" prop="ipAddress" />
              <el-table-column label="wildcardMask" prop="wildcardMask" />
              <el-table-column label="description" prop="description" />
              <el-table-column label="操作" prop="" width="150px" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInstance('network_params', scope.row, props.row)" />
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="handleDeleteNetwork(scope.row, props.row,scope.$index)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <!--            <h3 class="label-h5">接口列表：-->
            <!--              &lt;!&ndash;              <el-link type="primary">添加接口</el-link>&ndash;&gt;-->
            <!--            </h3>-->
            <el-divider content-position="left">接口列表</el-divider>
            <el-table
              :data="props.row.interfaces ? (isArray(props.row.interfaces.interface) ? props.row.interfaces.interface:Array(props.row.interfaces.interface)) : []"
            >
              <el-table-column label="ifName" prop="ifName" />
              <el-table-column label="networkType" prop="networkType" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="区域ID" prop="areaId" />
      <el-table-column label="区域类型" prop="areaType" />
      <el-table-column label="区域描述" prop="descriptionArea" />
      <el-table-column label="认证模式" prop="authenticationMode" />
      <el-table-column label="网络数">
        <template slot-scope="scope">
          {{ scope.row.networks?(isArray(scope.row.networks.network) ? scope.row.networks.network.length: 1): 0 }}
        </template>
      </el-table-column>
      <el-table-column label="接口数">
        <template slot-scope="scope">
          {{ scope.row.interfaces?(isArray(scope.row.interfaces.interfaces) ? scope.row.interfaces.interfaces.length: 1): 0 }}
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" width="150px" align="">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateInstance('area_params', scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteArea(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑区域对话框-->
    <el-dialog :title="dialogStatus" :visible.sync="dialogEditShow" :before-close="beforCloseDialog">
      <el-form label-position="left" label-width="120px">
        <el-form-item
          v-for="(item, key) in activeParam"
          :key="key"
          style="position: relative; padding: 10px 0 20px 0"
          :label="item.name"
          size="medium"
        >
          <div style="position: absolute;z-index: 100;top: -28px; font-size: smaller; color: #5a5e66">{{ item.remark }}
            <span style="margin-left: 5px;color: #3d7ed5">({{ item.constraint }})</span></div>
          <el-input v-model="temp[item.name]" :disabled="item.name === 'processId' || (item.name === 'areaId' && dialogStatus === 'network_params')" />
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24" style="text-align: right">
          <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
          <el-button type="" size="mini" @click="dialogEditShow = !dialogEditShow">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { isArray } from '@/utils/isType'
import { getOspfArea, createOspfArea, deleteOspfArea } from '@/api/detail/ospf/ospfArea'
import { getOspfAreaNetwork, createOspfAreaNetwork, deleteOspfAreaNetwork } from '@/api/detail/ospf/ospfAreaNetwork'

export default {
  name: 'OspfArea',
  props: {
    list: {
      type: Object
    },
    ip: {
      type: String
    },
    processId: {
      type: String
    }
  },
  data() {
    return {
      // list: [],
      area_params: [],
      network_params: [],
      temp: {},
      activeParam: [],
      dialogEditShow: false,
      dialogStatus: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    isArray(o) {
      return isArray(o)
    },
    handleSave() {
      switch (this.dialogStatus) {
        case 'network_params': {
          // 创建网络
          const data = {
            ip: this.ip,
            data: this.temp,
            source: this.$store.getters.source
          }
          createOspfAreaNetwork(data).then(res => {
            this.$message({ type: 'success', message: '配置成功。' })
            this.$emit('complete')
            this.getList()
            this.dialogEditShow = false
          }).catch(error => {
            this.$message({ type: 'error', message: error.response.data['msg'] })
          })
          break
        }
        case 'area_params': {
          // 创建区域
          const data = {
            ip: this.ip,
            data: this.temp,
            source: this.$store.getters.source
          }
          createOspfArea(data).then(res => {
            this.$message({ type: 'success', message: '配置成功。' })
            this.$emit('complete')
            this.getList()
            this.dialogEditShow = false
          }).catch(error => {
            this.$message({ type: 'error', message: error.response.data['msg'] })
          })
          break
        }
      }
    },
    handleDeleteArea(row, index) {
      this.temp.processId = this.processId
      this.temp.areaId = row.areaId
      this.temp.descriptionArea = row.descriptionArea
      const data = {
        ip: this.ip,
        data: this.temp,
        source: this.$store.getters.source
      }
      deleteOspfArea(data).then(res => {
        this.$message({ type: 'success', message: '配置成功。' })
        // this.$emit('complete')
        if (isArray(this.list.areas.area)) {
          this.list.areas.area.splice(index, 1)
        } else {
          delete this.list.areas
        }
        this.$emit('complete')
      }).catch(error => {
        this.$message({ type: 'error', message: error.response.data['msg'] })
      })
    },
    createInstance(param_name, row) {
      this.dialogStatus = param_name
      // 如果是添加网络
      if (row) {
        this.temp.areaId = row.areaId
      }
      this.activeParam = this[param_name]
      this.dialogEditShow = true
    },
    updateInstance(param_name, row, prow) {
      // console.log(param_name, row, prow)
      this.dialogStatus = param_name
      this.temp = row
      this.temp.processId = this.processId
      if (prow) {
        this.temp.areaId = prow.areaId
      }
      this.activeParam = this[param_name]
      this.dialogEditShow = true
    },
    beforCloseDialog() {
      this.dialogEditShow = false
      this.temp = {}
      this.temp.processId = this.processId
    },
    handleDeleteNetwork(row, prow, index) {
      // console.log(row, prow, index)
      const network_temp = Object.assign({}, row)
      network_temp.processId = this.processId
      network_temp.areaId = prow.areaId
      const data = {
        ip: this.ip,
        data: network_temp,
        source: this.$store.getters.source
      }
      deleteOspfAreaNetwork(data).then(res => {
        this.$message({ type: 'success', message: '配置成功。' })
        // this.$emit('complete')
        if (isArray(prow.networks.network)) {
          prow.networks.network.splice(index, 1)
        } else {
          delete prow.networks
        }
        this.$emit('complete')
      }).catch(error => {
        this.$message({ type: 'error', message: error.response.data['msg'] })
      })
    },
    getList() {
      const query = {
        ip: this.ip,
        source: this.$store.getters.source
      }
      getOspfArea(query).then(res => {
        this.area_params = res.params
        this.temp.processId = this.processId
      }).catch(error => {
        this.$message({ type: 'error', message: error.response.data['msg'] })
      })
      getOspfAreaNetwork(query).then(res => {
        this.network_params = res.params
        this.temp.processId = this.processId
      }).catch(error => {
        this.$message({ type: 'error', message: error.response.data['msg'] })
      })
    }
  }
}
</script>

<style scoped>

</style>
