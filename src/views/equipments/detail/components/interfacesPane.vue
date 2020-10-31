<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <h3 class="config-title">base configuration:</h3>
          <form method="post" action="/submit">

          <tree-form :obj="props.row.baseConfig"></tree-form>

            <input class="el-button el-button--mini el-button--primary"  type="submit" value="提交" />
            <el-button type="" size="mini">取消</el-button>

          </form>
          <h3 class="config-title">ipv4 configuration:</h3>
          <form method="post" action="/submit">
             <tree-form :obj="props.row.ipv4Config"></tree-form>
             <input class="el-button el-button--mini el-button--primary"  type="submit" value="提交" />
            <el-button type="" size="mini">取消</el-button>
          </form>

          <h3 class="config-title">ipv6 configuration:</h3>
          <form method="post" action="/submit">
             <tree-form :obj="props.row.ipv6Config"></tree-form>
             <input class="el-button el-button--mini el-button--primary"  type="submit" value="提交" />
            <el-button type="" size="mini">取消</el-button>
          </form>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <!--        el-icon-error-->
        <!--        Danger-->
        <!--        #F56C6C-->
        <!--        el-icon-warning-->
        <!--        Warning-->
        <!--        #E6A23C-->
        <span class="el-icon-success" style="color: #67C23A" />
      </el-table-column>
      <el-table-column
        label="接口名称"
        prop="ifName"
        width="200"
      />
      <el-table-column
        label="速率"
        prop="speed"
        width="150"
      />
      <el-table-column
        label="IP"
        prop="ip"
      />
      <el-table-column
        label="描述"
        prop="desc"
      />
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot="header">
          <el-button type="success" size="mini" @click="handleGether(ip)">
            立即采集
          </el-button>
          <el-button type="success" size="mini" @click="handlerefresh">
            刷新
          </el-button>
        </template>
        <template >
          <el-button type="danger" size="mini">
            关闭
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { gather, getinterfacesConfigByIP } from '@/api/detail/interfaces'
import TreeForm from '@/views/equipments/detail/components/tree-form'
export default {
  components: { TreeForm },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'base'
    },
    ip: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      tableData: [],
      // tableData: [{
      //   name: 'GE0/0/1',
      //   status: 'up',
      //   speed: '1000',
      //   desc: '接口谁说的法定发放',
      //   ip: '192.168.0.1',
      //   address: '上海市普陀区真北路',
      //   shop: '王小虎夫妻店',
      //   shopId: '10333'
      // }, {
      //   id: '12987123',
      //   name: '好滋好味鸡蛋仔',
      //   category: '江浙小吃、小吃零食',
      //   desc: '荷兰优质淡奶，奶香浓而不腻',
      //   address: '上海市普陀区真北路',
      //   shop: '王小虎夫妻店',
      //   shopId: '10333'
      // }
      // ],
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handlerefresh() {
      this.getList()
    },
    handleGether(ip) {
      this.loading =true
      gather(ip).then(res => {
        const data = res.map(item => {
          // console.log(JSON.parse(item.baseConfig))
          return {
            ifName: item.ifName,
            baseConfig: JSON.parse(item.baseConfig),
            ipv4Config: JSON.parse(item.ipv4Config),
            ipv6Config: JSON.parse(item.ipv6Config)
          }

        })

        this.tableData = data
        this.loading = false
        this.$message({type:'success', message:'采集成功。'})
      })
    },
    commitConfig(row) {
      console.log(row)
    },

    getList() {
      this.loading = true
      this.$emit('create') // for test
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.loading = false
      // })

      getinterfacesConfigByIP(this.ip).then(res => {
        const data = res.map(item => {
          // console.log(JSON.parse(item.baseConfig))
          return {
            ifName: item.ifName,
            baseConfig: JSON.parse(item.baseConfig),
            ipv4Config: JSON.parse(item.ipv4Config),
            ipv6Config: JSON.parse(item.ipv6Config)
          }
        })

        this.tableData = data

        this.$message({type:'success', message:'刷新成功。'})
      })
    }
  }
}
</script>
<style scoped>
.config-title{
  color: black;
  border-left: 4px dodgerblue solid;
  padding: 5px;

}
.config-btn{
  float: right;
  /*margin: 10px 50px;*/
}
</style>
