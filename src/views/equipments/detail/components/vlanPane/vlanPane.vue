<template>
  <div v-loading="loadingInit">
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button size="mini" type="primary" @click="handleCreate">添加</el-button>
          <el-button size="mini" type="success" @click="getList">刷新</el-button>
        </el-button-group>
<!--        <el-dropdown trigger="click">-->
<!--          <el-button style="margin-left: 10px" type="primary" size="mini">批量<i-->
<!--            class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--          </el-button>-->
<!--          <el-button size="mini" type="success" @click="getList" icon="el-icon-refresh">刷新</el-button>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item><i class="el-icon-edit"></i>批量添加</el-dropdown-item>-->
<!--            <el-dropdown-item><i class="el-icon-delete-solid"></i> 批量删除</el-dropdown-item>-->
<!--            <el-dropdown-item><i class="el-icon-eleme"></i>批量导出</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
      </el-col>
    </el-row>
    <el-table :data="list">
<!--      <el-table-column type="selection"></el-table-column>-->
      <el-table-column type="index">
        <template slot="header"><i class="el-icon-view"></i></template>
      </el-table-column>
      <el-table-column label="vlanId" prop="vlanId"></el-table-column>
      <el-table-column label="名称" prop="vlanName"></el-table-column>
      <el-table-column label="描述" prop="vlanDesc"></el-table-column>
      <el-table-column label="类型" prop="vlanType"></el-table-column>
      <el-table-column label="管理" prop="adminStatus">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.adminStatus === 'up'?'success':'danger'">
            {{ scope.row.adminStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="管理" prop="adminStatus" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primay" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    编辑框-->
    <el-dialog :title="dialogEditStatus" :visible.sync="dialogEditShow" :before-close="beforCloseDialog">
      <el-form label-position="left" label-width="100px">
        <el-form-item style="position: relative; padding: 10px 0 20px 0" v-for="(item, key) in params" :key="key"
                      :label="item.name" size="medium">
          <div style="position: absolute;z-index: 100;top: -28px; font-size: smaller; color: #5a5e66">{{ item.remark }}
            <span style="margin-left: 5px;color: #3d7ed5">({{ item.constraint }})</span></div>
          <el-input v-model="temp[item.name]"></el-input>
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
import { getVlans, createVlans, deleteVlans } from '@/api/detail/vlans'
import { isArray} from '@/utils/isType'

export default {
  name: 'VlanPane',
  props: {
    ip: {
      type: String
    }
  },
  data() {
    return {
      list: [],
      dialogEditStatus: '',
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
    beforCloseDialog() {
      // 关闭编辑框之前先清除tem的数据
      this.temp = {}
      this.dialogEditShow = false
    },
    handleDelete(row) {
      console.log(row)
      const data = {
        ip: this.ip,
        data: row
      }
      deleteVlans(data).then(res => {
        this.$message({ type: 'success', message: '删除成功。' })
        this.getList()
      }).catch(error => {
        console.log(error)
        const data = error.response['data']
        this.$message({ type: 'error', message: '初始化失败，请尝试刷新! ' + data['msg'] })
      })
    },
    handleCreate() {
      this.dialogEditStatus = 'create'
      this.dialogEditShow = true
    },
    handleUpdate(row) {
      this.temp = row
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
    },
    handleSave() {
      // 因为更新和创建的方法是一样的所以只需要一个方法
      const data = {
        ip: this.ip,
        data: this.temp
      }
      // const loading = this.$loading({
      //   lock: true,
      //   text: '正在创建vlan...',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      this.loadingInit = true
      createVlans(data).then(res => {
        this.$message({ type: 'success', message: '配置成功' })
        this.temp = {}
        this.dialogEditShow = false
        this.getList()
      }).catch(error => {
        const data = error.response['data']
        this.$message({ type: 'error', message: data['msg'] })
        this.loadingInit = false
      })
    },
    getList() {
      this.loadingInit = true
      getVlans(this.ip).then(res => {
        if (isArray(res.data.vlan.vlans.vlan)) {
          this.list = res.data.vlan.vlans.vlan
        } else {
          this.list = Array(res.data.vlan.vlans.vlan)
        }
        this.params = res.params
        this.loadingInit = false
        // this.temp = Object.assign({}, this.params[0])
      }).catch(error => {
        console.log(error)
        this.$message({ type: 'error', message: ' 请求失败，请尝试刷新! ' })
        this.loadingInit = false
      })
    }
  }
}
</script>

<style scoped>

</style>
