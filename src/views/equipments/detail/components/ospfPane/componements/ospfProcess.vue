<template>
  <div>
    <h5 class="label-h5">进程信息：
      <el-link type="primary">编辑</el-link>
      <el-button style="transform: scale(0.8)" size="mini" type="danger" @click="handleDelete">删除</el-button></h5>
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
import { getOspfProcess, deleteOspfProcess } from '@/api/detail/ospf/ospfProcess'

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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // getOspfProcess(this.ip).then(res => {
      //   this.params = res.params
      //   this.$emit('getProcessParams', this.params)
      // }).catch(error => {
      //   console.log(error.response)
      // })
    },
    handleDelete() {
      const data = {
        ip: this.ip,
        data: this.item
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

</style>
