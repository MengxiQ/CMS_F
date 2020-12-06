<template>
  <div v-loading="loadingInit">
    <el-row>
      <el-col :span="24">
        <el-button size="mini" type="primary" @click="handleCreate">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="isArray(list) ? list : Array(list)">
      <el-table-column align="center" label="vrf" prop="vrfName" />
      <el-table-column align="center" label="网段" prop="prefix" width="120" />
      <el-table-column align="center" label="掩码长度" prop="maskLength" />
      <el-table-column align="center" label="目标vrf" prop="destVrfName" />
      <el-table-column align="center" label="出接口" prop="ifName" />
      <el-table-column align="center" label="下一跳" prop="nexthop" width="140" />
      <el-table-column align="center" label="tag" prop="tag" />
      <el-table-column align="center" label="描述" prop="description" />
      <el-table-column align="center" label="操作" prop="" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
          <el-input v-model="temp[item.name]" />
        </el-form-item>
        <el-form-item v-if="dialogEditStatus === 'update'">
          <span>tips: 更改IP、掩码长度，出接口等参数为新增静态路由。如需更改请删除指定路由。</span>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24" style="text-align: right">
          <el-button type="primary" size="medium" @click="handleSave()">保存</el-button>
          <el-button type="" size="medium" @click="dialogEditShow = !dialogEditShow">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { baseMinxin } from '@/views/equipments/detail/components/Mixin/baseMixin'
import { getSatic_route, createSatic_route, deleteSatic_route } from '@/api/detail/static_route'

export default {
  name: 'StaticRoutePane',
  mixins: [baseMinxin],
  data() {
    return {
      temp: {
        ifName: 'Invalid0'
      }
    }
  },
  methods: {
    getList() {
      this.loadingInit = true
      getSatic_route(this.ip).then(res => {
        console.log(res)
        if (res.data) {
          this.list = res.data.staticrt.staticrtbase.srRoutes.srRoute
        } else {
          this.list = []
        }
        this.params = res.params
        this.loadingInit = false
      }).catch(error => this.getListError(error))
    },
    handleSave() {
      this.loadingInit = true
      const data = {
        ip: this.ip,
        data: this.temp
      }
      createSatic_route(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    },
    handleDelete(row) {
      this.loadingInit = true
      const data = {
        ip: this.ip,
        data: row
      }
      deleteSatic_route(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    }
  }
}
</script>

<style scoped>

</style>
