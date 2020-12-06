<template>
  <div>
    缺省路由发布:
    <el-table :data="list">
      <el-table-column label="开启" prop="defRoutEnableFlag">
        <template slot-scope="props">
          <el-switch
            v-model="(props.row || {}).defRoutEnableFlag"
            disabled
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="'true'"
            :inactive-value="'false'"
          />
        </template>
      </el-table-column>
      <!--      <el-table-column label="开销锁" prop="configCost"></el-table-column>-->
      <el-table-column label="开销" prop="cost" />
      <!--      <el-table-column label="路由类型锁" prop="configType" width="100"></el-table-column>-->
      <el-table-column label="路由类型" prop="type" />
      <el-table-column label="计算方式" prop="flag" />
      <el-table-column label="计算其他" prop="permitCalculateOther" />
      <el-table-column label="策略" prop="routePolicyName" />
      <el-table-column label="延迟" prop="delayTimer" />
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button size="mini" type="primary" :disabled="false" @click="handleUpdate(props.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    <el-form size="mini" inline>-->
    <!--      <el-form-item v-for="(item,key) in data" :key="key" :label="key" style="width: 50%" >{{item}}</el-form-item>-->
    <!--    </el-form>-->
    <!--    <el-switch-->
    <!--      v-model="temp.defRoutEnableFlag"-->
    <!--      active-color="#13ce66"-->
    <!--      inactive-color="#ff4949"-->
    <!--      :active-value="false"-->
    <!--      :inactive-value="true"-->
    <!--    />-->
    <!--    <el-form inline :disabled="temp.defRoutEnableFlag">-->
    <!--      <el-form-item label="flag">-->
    <!--        <el-select v-model="temp.flag" size="mini" value="always">-->
    <!--          <el-option label="always" value="Always" />-->
    <!--          <el-option label="permit-calculate-other" value="DefRtAdv" />-->
    <!--        </el-select>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="cost">-->
    <!--        <el-input size="mini" />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="type">-->
    <!--        <el-select size="mini" value="Type1">-->
    <!--          <el-option label="Type1" value="Type1" />-->
    <!--          <el-option label="Type2" value="Type2" />-->
    <!--        </el-select>-->
    <!--        <span style="font-size: smaller;color: #6f7180">tips: cost值和type值只能选填一个 </span>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <!--    <el-button size="mini" type="primary" style="float: right">保存</el-button>-->
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
          <el-select
            v-if="(item.constraint).match('CHIOCE<(?<p>.*)>')"
            v-model="temp[item.name]"
          >
            <el-option
              v-for="(i, k) in constraint(item.constraint)"
              :key="k"
              :value="i"
              :label="i"
            />
          </el-select>
          <el-switch
            v-if="item.constraint === 'BOOLEAN'"
            v-model="temp[item.name]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="'true'"
            :inactive-value="'false'"
          />
          <el-input
            v-if="item.constraint.match('INT<?(?<p>.*)>?') || item.constraint === 'IP' || item.constraint === 'MASK' || item.constraint === 'WILDCARD' || item.constraint === 'STRING'"
            v-model="temp[item.name]"
            :disabled="item.name === 'processId'"
          />
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
import { getOspfDefaultAdvise, createOspfDefaultAdvise } from '@/api/detail/ospf/ospfAdvance'
import { commonNetworkMixin } from '@/views/mixins/commonNetwork'
import { commonOperationMixin } from '@/views/mixins/commonOperationMixin'

export default {
  name: 'DefaultAdvisement',
  mixins: [commonNetworkMixin, commonOperationMixin],
  props: {
    ip: {},
    list: {
      type: Array,
      default() {
        return []
      }
    },
    processId: {}
  },
  data() {
    return {
      params: {},
      temp: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    constraint(val) {
      return val.match('CHIOCE<(?<p>.*)>').groups.p.split(',')
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
      this.temp.processId = this.processId
    },
    getList() {
      getOspfDefaultAdvise(this.ip).then(res => {
        // console.log(res)
        this.params = res.params
        console.log(this.processId)
      }).catch(error => this.getListError(error))
    },
    beforCloseDialog() {
      this.dialogEditShow = false
      this.temp = {}
    },
    handleSave() {
      const data = {
        ip: this.ip,
        data: this.temp
      }
      createOspfDefaultAdvise(data).then(res => {
        this.opsSuccess('更新')
        this.$emit('success')
      }).catch(error => this.opsError(error, '更新'))
    }
  }
}
</script>

<style scoped>

</style>
