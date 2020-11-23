<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="mini" type="primary" @click="handleCreate">添加</el-button>
<!--        <el-button size="mini" type="primary" @click="6">批量</el-button>-->
      </el-col>
    </el-row>
    <el-table
      :data="list"
      max-height="200px"
    >
      <el-table-column
        type="index"
        align="center"
      >
        <template slot="header"><i class="el-icon-view"></i>
        </template>
      </el-table-column>
<!--      <el-table-column type="selection"></el-table-column>-->
      <el-table-column label="接口名称" prop="memberIfName"></el-table-column>
      <el-table-column label="接口带宽" prop="weight"></el-table-column>
      <el-table-column align="center" label="操作" prop="" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog :title="dialogEditStatus" :visible.sync="dialogEditShow" :before-close="beforCloseDialog">
      <el-form label-position="left" label-width="100px">
        <el-form-item
          style="position: relative; padding: 10px 0 20px 0"
          v-for="(item, key) in params"
          :key="key"
          :label="item.name"
          size="medium">
          <div style="position: absolute;z-index: 100;top: -28px; font-size: smaller; color: #5a5e66">{{ item.remark }}
            <span style="margin-left: 5px;color: #3d7ed5">({{ item.constraint }})</span></div>
          <el-input v-model="temp[item.name]" :disabled="item.name === 'ifName'"></el-input>
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
import { baseMixinProps } from '@/views/equipments/detail/components/Mixin/baseMixinProps'
import { createTrunkMember, deleteTrunkMember } from '@/api/detail/interfaces'

export default {
  name: 'TrunkMemberIf',
  mixins: [baseMixinProps],
  props: {
    ifName: {
      type: String
    }
  },
  methods: {
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.ifName = this.ifName
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
    },
    handleCreate() {
      this.temp.ifName = this.ifName
      this.dialogEditStatus = 'create'
      this.dialogEditShow = true
    },
    handleSave() {
      this.loadingInit = true
      const data = {
        ip: this.ip,
        data: this.temp
      }
      createTrunkMember(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    },
    handleDelete(row) {
      this.loadingInit = true
      const data = {
        ip: this.ip,
        data: row
      }
      data.data.ifName = this.ifName
      deleteTrunkMember(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    },
    createSuccess() {
      this.$message({ type: 'success', message: '配置成功。' })
      this.dialogEditShow = false
      this.loadingInit = false
      this.$emit('createsuccess')
    }
  }
}
</script>

<style scoped>

</style>
