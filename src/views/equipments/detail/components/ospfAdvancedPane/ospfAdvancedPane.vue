<template>
  <div v-loading="loadingInit">
    <el-row>
      <el-col :span="24">
        <el-button size="mini" icon="el-icon-refresh" type="success" @click="getList">刷新</el-button>
      </el-col>
    </el-row>
    <el-table
      v-if="list"
      :data="isArray(list)?list:Array(list)"
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="inner-table">
            <h5 class="label-h5">路由引入（import）
              <el-link type="primary" @click="handleCreate(props.row)">添加引入</el-link>
            </h5>
            <el-table
              :data="props.row.ProcessTopologys.ProcessTopology.importRouteMTs ? (isArray(props.row.ProcessTopologys.ProcessTopology.importRouteMTs.importRouteMT) ? props.row.ProcessTopologys.ProcessTopology.importRouteMTs.importRouteMT : Array(props.row.ProcessTopologys.ProcessTopology.importRouteMTs.importRouteMT) ) : []"
            >
              <el-table-column label="协议" prop="protocol"/>
              <el-table-column label="进程ID" prop="protocolProcessId"/>
              <el-table-column label="开销" prop="cost"/>
              <el-table-column label="tag" prop="tag"/>
              <el-table-column label="type" prop="type"/>
              <el-table-column label="策略名称" prop="routePolicyName"/>
              <el-table-column label="管理" prop="adminStatus" width="150" align="center">
                <template slot-scope="scope">
                  <!--                  <el-button size="mini" type="primay" @click="handleUpdate(scope.row, props.row)">编辑</el-button>-->
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row, props.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <h5 class="label-h5">其他配置:</h5>
            发布默认路由:
            <el-switch
              v-model="temp.defRoutEnableFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="false"
              :inactive-value="true">
            </el-switch>
            <el-form inline :disabled="temp.defRoutEnableFlag">
              <el-form-item label="flag">
                <el-select size="mini" value="always" v-model="temp.flag">
                  <el-option label="always" value="Always"></el-option>
                  <el-option label="permit-calculate-other" value="DefRtAdv"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="cost">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="type">
                <el-select size="mini" value="Type1">
                  <el-option label="Type1" value="Type1"></el-option>
                  <el-option label="Type2" value="Type2"></el-option>
                </el-select>
                <span style="font-size: smaller;color: #6f7180">tips: cost值和type值只能选填一个 </span>
              </el-form-item>
            </el-form>
            <el-button size="mini" type="primary" style="float: right">保存</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="进程ID" prop="processId"/>
      <el-table-column label="默认开销" prop="ProcessTopologys.ProcessTopology.defaultCost"/>
      <el-table-column label="模认类型" prop="ProcessTopologys.ProcessTopology.defaultType"/>
      <el-table-column label="topo名称" prop="ProcessTopologys.ProcessTopology.topoName"/>
    </el-table>
    <!--    编辑框-->
    <el-dialog :title="dialogEditStatus" :visible.sync="dialogEditShow" :before-close="beforCloseDialog">
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
          <el-input v-model="temp[item.name]" :disabled="item.name === 'processId'"/>
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
import { getOspfAdvance, createOspfAdvance, deleteOspfAdvance } from '@/api/detail/ospf/ospfAdvance'
import { baseMinxin } from '@/views/equipments/detail/components/Mixin/baseMixin'

export default {
  name: 'OspfAdvancedPane',
  mixins: [baseMinxin],
  props: {
    ip: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCreate(row) {
      this.temp = {}
      this.temp.processId = row.processId
      // console.log(this.temp)
      this.dialogEditStatus = 'create'
      this.dialogEditShow = true
    },
    handleUpdate(row, prow) {
      this.temp = row
      this.temp.processId = prow.processId
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
    },
    beforCloseDialog() {
      this.dialogEditShow = false
    },
    handleSave() {
      const data = {
        ip: this.ip,
        data: this.temp
      }
      createOspfAdvance(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    },
    handleDelete(row, prow) {
      this.temp = row
      this.temp.processId = prow.processId
      const data = {
        ip: this.ip,
        data: this.temp
      }
      deleteOspfAdvance(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    },
    getList() {
      this.loadingInit = true
      getOspfAdvance(this.ip).then(res => {
        console.log(res)
        if (res.data) {
          if (this.isArray(res.data.ospfv2.ospfv2comm.ospfSites.ospfSite)) {
            this.list = res.data.ospfv2.ospfv2comm.ospfSites.ospfSite
          } else {
            this.list = Array(res.data.ospfv2.ospfv2comm.ospfSites.ospfSite)
          }
        }
        this.params = res.params
        this.loadingInit = false
      }).catch(error => this.getListError(error))

    }
  }
}
</script>

<style scoped>
.label-h5 {
  border-left: solid #3d7ed5 4px;
  padding-left: 4px;
  font-size: larger;
}

.inner-table {
  background: rgb(249, 249, 249);
  padding: 10px 10px 40px;
}
</style>
