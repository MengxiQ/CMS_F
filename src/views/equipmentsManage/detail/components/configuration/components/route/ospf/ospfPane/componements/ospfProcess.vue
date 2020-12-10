<template>
  <div>
    <el-popconfirm
      :title="'确定要删除ospf进程（' + item.processId+ '）吗？'"
      @onConfirm="handleDelete()"
    >
      <el-button slot="reference" size="mini" type="danger">删除</el-button>
    </el-popconfirm>
    <!--    <h5 class="label-h5">进程信息：-->
    <!--&lt;!&ndash;      <el-link type="primary">编辑</el-link>&ndash;&gt;-->
    <!--      </h5>-->
    <el-divider content-position="left">进程信息</el-divider>
    <el-form label-position="left" inline>
      <el-form-item label="processId:">
        <span class="form-titem-valus">{{ item.processId }}</span>
      </el-form-item>
      <el-form-item label="routerId:">
        <span class="form-titem-valus">{{ item.routerId }}</span>
      </el-form-item>
      <el-form-item label="description:">
        <span class="form-titem-valus">{{ item.description }}</span>
      </el-form-item>
      <el-form-item label="vrfName:">
        <span class="form-titem-valus">{{ item.vrfName }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deleteOspfProcess } from '@/api/detail/ospf/ospfProcess'

export default {
  name: 'OspfProcess',
  props: {
    item: {
      type: Object
    },
    ip: {
      type: String
    }
  },
  data() {
    return {
      params: []
    }
  },
  methods: {
    handleDelete() {
      const data = {
        ip: this.ip,
        data: this.item,
        source: this.$store.getters.source
      }
      deleteOspfProcess(data).then(res => {
        this.$message({ type: 'success', message: '配置成功。' })
        this.$emit('complete')
      }).catch(error => {
        this.$message({ type: 'error', message: error.response.data['msg'] })
      })
    }
  }
}
</script>

<style scoped>
.form-titem-valus {
  color: #6f7180;
  margin-right: 20px;

}
</style>
