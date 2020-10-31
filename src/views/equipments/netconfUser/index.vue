<template>
  <div>
    <div class="heard-tool">
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <el-button size="mini" type="success" icon="el-icon-refresh" @click="getList">刷新</el-button>
    </div>
    <el-table :data="list"
              fit
              highlight-current-row
               v-loading="loading"
              style="width: 100%;">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.enableEdit">{{ scope.row.username }}</span>
          <el-input v-else v-model="scope.row.username" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="密码" prop="password" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.enableEdit">{{ scope.row.password }}</span>
          <el-input v-else v-model="scope.row.password" type="" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="端口号" prop="port" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.enableEdit">{{ scope.row.port }}</span>
          <el-input v-else v-model="scope.row.port" type="" size="mini"></el-input>
        </template>
      </el-table-column >
      <el-table-column label="设备厂商" prop="device_params" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.enableEdit">{{ scope.row.device_params }}</span>
          <el-select v-else v-model="scope.row.device_params" type="" size="mini">
            <el-option label="华为" value="huawei"></el-option>
            <el-option label="锐捷" value="ruijie"></el-option>
            <el-option label="思科" value="cisco"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="设备IP" prop="equipment" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.enableEdit">{{ scope.row.equipment }}</span>
          <el-input v-else v-model="scope.row.equipment" type="" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="设备秘钥" prop="hostkey">
        <template slot-scope="scope">
<!--          el-icon-view-->
<!--          el-icon-edit-outline-->
          <el-button size="mini" type="primary" icon="el-icon-view" @click="showHostKey(scope.row)">查看</el-button>
<!--          <span v-if="!scope.row.enableEdit">{{ scope.row.hostkey }}</span>-->
<!--          <el-input v-else v-model="scope.row.hostkey" type="textarea" size="mini"></el-input>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleSave(scope.row)" v-if="scope.row.enableEdit">保存
          </el-button>
          <el-button
            size="mini"
            v-if="!scope.row.enableEdit"
            style="margin-right: 5px"
            @click="scope.row.enableEdit = !scope.row.enableEdit">编辑
          </el-button>
          <el-button
            size="mini"
            v-else
            @click="scope.row.enableEdit = !scope.row.enableEdit">取消
          </el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button
            size="mini"
            type="danger"
             slot="reference"
            >删除
          </el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <!--    添加弹出框-->
    <el-dialog
      title="添加用户"
      :visible.sync="flags.addDialogVisible"
      width="50%"
      :before-close="beforeClose">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="temp.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="temp.password"></el-input>
        </el-form-item><el-form-item label="端口号">
          <el-input v-model="temp.port"></el-input>
        </el-form-item>
        <el-form-item label="厂商">
         <el-select  v-model="temp.device_params" style="">
            <el-option label="华为" value="huawei"></el-option>
            <el-option label="锐捷" value="ruijie"></el-option>
            <el-option label="思科" value="cisco"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="HostKey">
          <el-input placeholder="请输入HostKey" type="textarea"
                    v-model="temp.hostkey"
                    :autosize="{ minRows: 5, }">

          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="commitAddData">确 定</el-button>
      </div>
    </el-dialog>

<!--    编辑HostKey-->
    <el-dialog  title="编辑" :visible="ShowEditHostKey" width="80%" @close="ShowEditHostKey = false">
<!--      <h1 style="position:absolute; margin: 0;padding: 0;width: 100%;text-align: left;font-size: 17px;font-weight: normal;height: 20px">{{ativeTemplate.name}}</h1>-->
      <template slot="title">编辑HostKey: <span style="font-weight: bold; color: #3d7ed5">{{activeItem.username}}</span></template>
      <el-input placeholder="请输入HostKey" type="textarea" v-model="activeItem.hostkey" :autosize="{ minRows: 5, }"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="ShowEditHostKey = false">
          取消
        </el-button>
        <el-button size="mini" type="primary" @click="saveHostKey">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, updateNetconfuser, createNetconfuser, deleteNetconfuser} from '@/api/netconfUsers'

export default {
  name: 'templateTypes',
  data() {
    return {
      query:{ //查询的过滤条件
        name:'',
      },
      loading:true,
      list: [],
      activeItem:{},
      ShowEditHostKey:false,
      flags: {
        addDialogVisible: false
      },
      temp: {
        "id": 1,
        "equipment": "",
        "username": "",
        "password": "",
        "port": 22,
        "device_params": "huawei",
        "hostkey": null
      }
    }
  },
  methods: {
    showHostKey(row){
      this.activeItem = row
      this.ShowEditHostKey = true

    },
    saveHostKey(){
      this.handleSave(this.activeItem)

    },
    beforeClose() {
      this.flags.addDialogVisible = false
      this.temp = {
       "id": 1,
        "equipment": "",
        "username": "",
        "password": "",
        "port": 22,
        "device_params": "huawei",
        "hostkey": null
      }
    },
    handleAdd() {
      this.flags.addDialogVisible = true
    },
    commitAddData() {
      createNetconfuser(this.temp).then(res => {
        this.$message({ type: 'success', message: '添加成功，' })
        this.beforeClose()
        this.getList()
      }).catch(error => {
        console.log(error)
        this.$message({ type: 'error', message: '添加失败！' })
      })
    },
    handleCloseAddDialog() {

    },
    handleSave(row) {
      updateNetconfuser(row).then(res => {
        this.$message({ type: 'success', message: '保存成功，' })
        this.beforeClose()
        this.getList()
      }).catch(error => {
        console.log(error)
        this.$message({ type: 'error', message: '保存失败！' })
        this.getList()
      })
    },
    handleDelete(id) {
      deleteNetconfuser(id).then(res => {
        this.$message({ type: 'success', message: '删除成功！' })
        this.getList()
      }).catch(erro => {
        this.$message({ type: 'error', message: '删除失败！' })
      })
    },
    getList() {
      this.loading = true
      fetchList(this.query).then(res => {
        // enableEdit
        const data = res.map(item => {
          item.enableEdit = false
          return item
        })
        this.list = data
        this.loading = false
      }).catch(erro => {
        console.log(erro)
        this.$message({ type: 'error', message: '获取列表失败！' })
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>
  .heard-tool {
    padding: 10px;
  }

</style>
