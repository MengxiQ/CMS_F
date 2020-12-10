<template>
  <el-container>
    <el-aside width="150px" >
      <el-menu default-active="index">
        <el-menu-item index="index">
          <i class="el-icon-cpu"></i>
          <span slot="title">设备维护</span></el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <el-divider content-position="left">配置文件</el-divider>
      <el-form inline size="mini" style="margin-left: 40px">
        <el-form-item label="源配置">
          <el-select v-model="temp.source">
            <el-option label="running" value="running" />
            <el-option label="startup" value="startup" disabled />
          </el-select>
        </el-form-item>
        <el-form-item label="目标配置">
          <el-select v-model="temp.target">
            <el-option label="running" value="running" disabled />
            <el-option label="startup" value="startup" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" :disabled="loadingInit" @click="save"><i v-if="loadingInit" class="el-icon-loading" />保存</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">操作设备</el-divider>
    </el-main>
  </el-container>
</template>

<script>
import { saveConfig } from '@/api/detail/common/saveconfig'
import { baseMinxin } from '@/views/equipmentsManage/detail/components/configuration/components/Mixin/baseMixin'

export default {
  name: 'Maintain',
  mixins: [baseMinxin],
  data() {
    return {
      loadingInit: false,
      temp: {
        source: 'running',
        target: 'startup'
      }
    }
  },
  methods: {
    save() {
      this.loadingInit = true
      const data = {
        ip: this.ip,
        source: this.temp.source,
        target: this.temp.target
      }
      saveConfig(data).then(res => this.createSuccess()).catch(error => this.createError(error))
    }
  }
}
</script>

<style scoped>

</style>
