<template>
  <div v-loading="loadingInit">
    <el-table :data="isArray(list) ? list : Array(list)" highlight-current-row>
      <el-table-column type="expand">
        <template slot="header"><i class="el-icon-view"></i></template>
        <template slot-scope="scope">
          <div style="background-color: #f9f9f9; padding: 10px">
            <trunk-member-if
              @createsuccess="getList"
              :ip="ip"
              :params="menmberParams"
              :if-name="scope.row.ifName"
              :list="scope.row.TrunkMemberIfs ?(isArray(scope.row.TrunkMemberIfs.TrunkMemberIf) ? scope.row.TrunkMemberIfs.TrunkMemberIf : Array(scope.row.TrunkMemberIfs.TrunkMemberIf)):[]"
            ></trunk-member-if>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" prop="ifName"></el-table-column>
      <el-table-column align="center" label="最小活动数" prop="minUpNum"></el-table-column>
      <el-table-column align="center" label="最大活动数" prop="maxUpNum"></el-table-column>
      <el-table-column align="center" label="工作模式" prop="workMode"></el-table-column>
      <el-table-column align="center" label="MAC" prop="ifMac" width="130"></el-table-column>
      <el-table-column align="center" label="hashType" prop="hashType"></el-table-column>
      <el-table-column align="center" label="操作" prop="" width="150">
        <template slot="header">
           <el-button type="primary" size="mini" @click="handleCreate">添加</el-button>
          <el-button type="success" size="mini" @click="getList">刷新</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑框-->
    <el-dialog :title="dialogEditStatus" :visible.sync="dialogEditShow" :before-close="beforCloseDialog">
      <el-form label-position="left" label-width="120px">
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
            v-if="item.constraint ? (item.constraint).match('CHIOCE<(?<p>.*)>') : false"
            v-model="temp[item.name]"
          >
            <el-option
              v-for="(i, k) in constraint(item.constraint)"
              :key="k"
              :value="i"
              :label="i"
            />
          </el-select>
          <el-input
            v-if="item.constraint === 'INT' || item.constraint === 'IP' || item.constraint === 'MASK' || item.constraint === 'WILDCARD' || item.constraint === 'STRING'"
            v-model="temp[item.name]"
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
import {baseMinxin} from '@/views/equipments/detail/components/Mixin/baseMixin'
import {
  getEthTrunkInterfaces,
  createEthTrunkInterface,
  deleteEthTrunkInterface,
  getEthTrunkMember
} from '@/api/detail/interfaces'
import TrunkMemberIf from '@/views/equipments/detail/components/interfacesPane/ethTrunk/trunkMemberIf'

export default {
  name: 'EthTrunk',
  components: {TrunkMemberIf},
  mixins: [baseMinxin],
  data() {
    return {
      menmberParams: []
    }
  },
  methods: {
    getList() {
      this.loadingInit = true
      // promise数组
      const promiseArr = [
        getEthTrunkInterfaces(this.ip).then(res => {
          this.list = ((((res.data || {}).ifmtrunk || {}).TrunkIfs || {}).TrunkIf) || []
          this.params = res.params
        }).catch(error => this.getListError(error)),
        getEthTrunkMember(this.ip).then(res => {
          this.menmberParams = res.params
        }).catch(error => this.getListError(error))
      ]
      // 并发
      Promise.all(promiseArr).then(_ => {
        this.loadingInit = false
      }).catch(error => this.getListError(error))
    },
    handleSave() {
      this.loadingInit = true
      const data = {
        ip: this.ip,
        data: this.temp
      }
      createEthTrunkInterface(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    },
    handleDelete(row) {
      const data = {
        ip: this.ip,
        data: row
      }
      deleteEthTrunkInterface(data).then(res => this.createSuccess()).catch(error => this.createError(error))
      console.log('delete', data)
    }
  }
}
</script>

<style scoped>

</style>
