<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button size="mini" type="primary" @click="handleCreate">添加</el-button>
          <el-button size="mini" type="success" @click="getList">刷新</el-button>
        </el-button-group>
      </el-col>

      <el-col style="padding-bottom: 100px">
        <divider-info :data-source="dataSource" />
        <el-table v-loading="loadingInit" :data="list">
          <!--      <el-table-column type="selection"></el-table-column>-->
          <el-table-column type="index">
            <template slot="header"><i class="el-icon-view" /></template>
          </el-table-column>
          <el-table-column label="vlanId" prop="vlanId" />
          <el-table-column label="名称" prop="vlanName" />
          <el-table-column label="描述" prop="vlanDesc" />
          <el-table-column label="类型" prop="vlanType" />
          <el-table-column label="管理" prop="adminStatus">
            <template slot-scope="scope">
              <el-tag size="mini" :type="scope.row.adminStatus === 'up'?'success':'danger'">
                {{ scope.row.adminStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="adminStatus" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primay" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
          <el-input v-model="temp[item.name]" :disabled="item.name === 'vlanId' && dialogEditStatus === 'update'" />
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24" style="text-align: right">
          <el-button type="primary" size="mini" @click="handleSave()">保存</el-button>
          <el-button type="" size="mini" @click="beforCloseDialog">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getVlans, createVlans, deleteVlans } from '@/api/detail/vlans'
import { isArray } from '@/utils/isType'
import DividerInfo from '@/views/equipmentsManage/detail/components/configuration/components/Mixin/divider-info'

export default {
  name: 'VlanPane',
  components: { DividerInfo },
  props: {
  },
  data() {
    return {
      list: [],
      dialogEditStatus: '',
      dialogEditShow: false,
      params: [],
      temp: {},
      loadingInit: true,
      dataSource: '' // 标识当前的数据是那个数据库的
    }
  },
  computed: {
    ip() {
      return this.$route.params.ip
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
        data: row,
        source: this.$store.getters.source
      }
      deleteVlans(data).then(res => {
        this.$message({ type: 'success', message: '删除成功。' })
        this.getList()
      }).catch(error => {
        console.log(error)
        if (error.response) {
          const data = error.response['data']
          this.$message({ type: 'error', message: data['msg'] })
        } else {
          this.$message({ type: 'error', message: '获取列表失败.' })
        }
      })
    },
    handleCreate() {
      this.dialogEditStatus = 'create'
      this.dialogEditShow = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
    },
    handleSave() {
      // 因为更新和创建的方法是一样的所以只需要一个方法
      const data = {
        ip: this.ip,
        data: this.temp,
        source: this.$store.getters.source
      }
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
      const query = {
        ip: this.ip,
        source: this.$store.getters.source
      }
      getVlans(query).then(res => {
        if (isArray(res.data.vlan.vlans.vlan)) {
          this.list = res.data.vlan.vlans.vlan
        } else {
          this.list = Array(res.data.vlan.vlans.vlan)
        }
        this.params = res.params
        this.dataSource = query.source
        this.loadingInit = false
        // this.temp = Object.assign({}, this.params[0])
      }).catch(error => {
        // console.log(error.response)
        if (((error.response || {}).data || {}).msg) {
          const data = error.response.data
          this.params = data.params
          // 候选数据没有创建
          console.log(data.msg)
          if (data.msg.match('candidate data store does not exist.') !== null) {
            this.list = []
            this.dataSource = this.$store.getters.source
            this.$message({ type: 'info', message: '开始配置并创建candidate数据库.' })
          } else {
            this.$message({ type: 'error', message: data.msg })
          }
        } else {
          this.$message({ type: 'error', message: '获取列表失败.' })
        }
        // print('candidate data store does not exist.')
        this.loadingInit = false
      })
    }
  }
}
</script>

<style scoped>

</style>
