<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        size="small"
        placeholder="设备名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.ip"
        size="small"
        placeholder="IP地址"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.type" size="small" placeholder="类型" clearable class="filter-item">
        <el-option v-for="(item, key) in this.$store.getters.neTypes" :key="key" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜素
      </el-button>
      <el-button-group style="float: right">
        <el-button size="small" class="filter-item" style="" type="primary" icon="el-icon-edit" @click="handleCreate">
          添加
        </el-button>
        <!--      <el-button v-waves size="small" :loading="downloadLoading" class="filter-item" type="primary"-->
        <!--                 icon="el-icon-download" @click="handleDownload">-->
        <!--        导出-->
        <!--      </el-button>-->
        <el-button size="small" class="filter-item" style="" type="success" icon="el-icon-refresh" @click="handlerefresh">刷新
        </el-button>
      </el-button-group>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      @sort-change="sortChange"
    >
      <el-table-column type="index" >
        <template slot="header"><i class="el-icon-view"></i></template>
      </el-table-column>
      <!--      <el-table-column sortable label="index" type="index" align="" width="70" />-->
      <el-table-column  label="名称" prop="name" align="" :class-name="getSortClass('name')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP地址" prop="ip" align="" width="140" :class-name="getSortClass('ip')">
        <template slot-scope="{row}">
          <span><el-link type="primary" @click="gotoDetail(row)">{{ row.ip }}</el-link></span>
        </template>
      </el-table-column>
      <el-table-column label="MAC地址" prop="mac"/>
      <el-table-column label="型号" prop="unittype" align="" :class-name="getSortClass('unittype')">
        <template slot-scope="{row}">
          <span>{{ row.unittype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" prop="id" align="" :class-name="getSortClass('type')">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加日期" align="">
        <template slot-scope="{row}">
          <span>{{ parseTime(new Date(Date.parse(row.stock_date)), '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" align="">
        <template slot-scope="{row}">
          <el-tag :type="(row.status ? row.status.type.show_type : null)">
            {{ row.status ? row.status.type.name : '无状态' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button-group>
            <el-button type="" size="mini" @click="handleUpdate(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    <!--    弹出编辑框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="80px" style="width:100% ;height: 100%">
        <div class="dialog_body">
          <div class="dialog_content left">
            <h3 class="dialog_title">基本信息：</h3>
            <el-form-item label="设备名称" prop="name">
              <el-input v-model="temp.name"/>
            </el-form-item>
            <el-form-item label="设备类型" prop="type">
              <el-select v-model="temp.type" placeholder="Please select">
                <el-option v-for="(item, key) in this.$store.getters.neTypes" :key="key" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="型号" prop="unittype">
              <el-select v-model="temp.unittype">
                <el-option
                  v-for="(item,key) in this.$store.getters.unitTypes"
                  :key="key"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="IP" prop="ip">
              <el-input v-model="temp.ip"/>
            </el-form-item>
            <el-form-item label="MAC" prop="mac">
              <el-input v-model="temp.mac"/>
            </el-form-item>
            <el-form-item label="创建时间" prop="stock_date">
              <el-date-picker v-model="temp.stock_date" type="datetime" placeholder="Please pick a date"/>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="temp.remark" type="textarea"/>
            </el-form-item>
          </div>
          <div class="dialog_content right">
            <h3 class="dialog_title">Netconf 用户信息:</h3>
            <!--            <el-form-item label="设备IP" prop="equipment" aria-readonly="true" >-->
            <!--              <el-input v-model="netconfUserTemp.equipment" readonly />-->
            <!--            </el-form-item>-->
            <el-form-item label="用户名" prop="username">
              <el-input v-model="temp.netconfusers_set[0].username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="temp.netconfusers_set[0].password"/>
            </el-form-item>
            <el-form-item label="port" prop="port">
              <el-input v-model="temp.netconfusers_set[0].port"/>
            </el-form-item>
            <el-form-item label="类型参数" prop="device_params">
              <el-select
                v-model="temp.netconfusers_set[0].device_params"
                class="filter-item"
                placeholder="Please select"
              >
                <el-option v-for="item in device_params" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="hostkey" prop="hostkey">-->
<!--              <el-input v-model="temp.netconfusers_set[0].hostkey" type="textarea"/>-->
<!--            </el-form-item>-->
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {
  createEquipment, deleteEquipment, fetchEquipmentList, updateEquipment, createStatus, updateStatus
} from '@/api/equipment'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'EquipmentList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '在线': 'success',
        '离线': 'danger'
        // draft: 'info',
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      device_params: [
        { key: 'huawei', display_name: '华为' },
        { key: 'cisco', display_name: '思科' },
        { key: 'ruijie', display_name: '锐捷' }
      ],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        ip: undefined,
        name: undefined,
        type: undefined,
        sort: '+id'
      },
      showReviewer: false,
      temp: {
        ip: null,
        mac: null,
        stock_date: new Date(),
        status: null,
        name: '',
        type: null,
        unittype: '',
        netconfUser: null,
        netconfusers_set: [{
          'id': null,
          'equipment': '',
          'username': '',
          'password': '',
          'port': 22,
          'device_params': 'huawei',
          'hostkey': null
        }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    // setInterval(_ => {
    // console.log('refresh List.')
    this.listLoading = true
    fetchEquipmentList().then(response => {
      if (response.results === null) {
        this.list = response.results
        this.total = response.count
        this.listLoading = false
      } else {
        this.list = response
        // this.$forceUpdate()
        // console.log(this.list)
        this.listLoading = false
        this.$forceUpdate()
      }
    }).catch(error => {
      console.log(error)
      this.$message({ type: 'error', message: '请求失败！' })
    })
    // }, 30000)
  },
  methods: {
    parseTime(time, format) {
      return parseTime(time, format)
    },
    handlerefresh() {
      this.getList()
    },
    gotoDetail(row) {
      console.log(row)
      const statusType = ((row.status || {}).type || {}).name
      if (statusType === '离线' || statusType === undefined) {
        this.$message({ type: 'error', message: '该设备不在线！' })
      } else {
        this.$router.push({
          path: '/equipments/detail/' + row.ip
        })
      }
    },
    getList() {
      this.listLoading = true
      fetchEquipmentList(this.listQuery).then(response => {
        if (response !== null) {
          this.list = response.results
          this.total = response.count
          this.listLoading = false
        } else {
          return null
        }
      }).catch(error => {
        console.log(error)
        this.$message({ type: 'error', message: '请求失败！' })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      // 如果状态为空则给设备创建新状态
      if (row.status === null) {
        const data = {
          'id': row.id,
          'status': {
            'type_id': 1,
            'date': new Date(),
            'site': '',
            'remark': ''
          }
        }
        createStatus(data).then(res => {
          console.log(res)
          row.status = res
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        }).catch(reason => {
          console.log(reason)
        })
      }
      // 如果状态不为空则更新状态
      if (row.status) {
        const temp = {
          'id': row.status.id,
          'type_id': 1,
          'date': new Date(),
          'site': '',
          'remark': ''
        }
        // 根据传过来的值“在线”则更新为在线
        switch (status) {
          case '在线':
            temp.remark = '在线'
            temp.type_id = 1
            break
          case '离线':
            temp.remark = '离线'
            temp.type_id = 2
            break
        }
        updateStatus(temp).then(response => {
          row.status = response
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        }).catch(reason => {
          console.log(reason)
        })
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        ip: null,
        mac: null,
        stock_date: new Date(),
        status: null,
        name: '',
        type: null,
        unittype: '',
        netconfUser: null,
        netconfusers_set: [{
          'id': null,
          'equipment': '',
          'username': '',
          'password': '',
          'port': 22,
          'device_params': 'huawei',
          'hostkey': null
        }]
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
      // 拼接数据
      createEquipment(this.temp).then(respon => {
        this.dialogFormVisible = false
        // 或许不用刷新，可以直接append返回的数据
        this.handlerefresh()
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      }).catch(reason => {
        console.log(reason)
        this.$notify({
          title: 'Fault',
          message: 'Created Faults',
          type: 'danger',
          duration: 2000
        })
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      updateEquipment(this.temp).then(() => {
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      }).catch(error => {
        console.log(error)
        this.$message({ type: 'error', message: '配置出错，请检查表单内容' + ((error.response || {}).data || {}).msg })
      })
    },
    handleDelete(row, index) {
      deleteEquipment(row).then(reason => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      }).catch(reason => {
        this.$notify({
          title: 'Faults',
          message: 'Delete Faults',
          type: 'danger',
          duration: 2000
        })
      })
    },
    handleFetchPv(pv) {
      // fetchPv(pv).then(response => {
      //   this.pvData = response.data.pvData
      //   this.dialogPvVisible = true
      // })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-container {
  padding: 10px;
}

.filter-item {
  //margin-right: 5px;
}

.dialog_content {
  display: inline-block;
  width: 50%;
  padding: 0 20px;

}

.left {
  float: left;
  border-right: rgb(52, 153, 215) dashed 1px;
}

.right {
  float: right;
}

.dialog_body {
  height: 500px;
}

.dialog_title {
  color: #313131;
}
</style>
