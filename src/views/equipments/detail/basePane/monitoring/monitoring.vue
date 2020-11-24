<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col class="col" :span="12">
          <system-info :ip="ip"></system-info>
        </el-col>
        <el-col class="col" :span="12">
          <alarm :ip="ip"></alarm>
        </el-col>
      </el-row>
      <el-row v-loading="loadingInit">
        <el-col :span="24"><el-button size="mini" @click="getList">刷新单板信息</el-button></el-col>
        <el-col class="col" v-for="(item, key) in list" :key="key" :md="12" :xs="24">
          <board-res-states :loading="loadingInit" :data="item" @reload="getList" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BoardResStates from '@/views/equipments/detail/basePane/monitoring/componements/boardResStates'
import { getBoardResStates } from '@/api/detail/monitoring/monitoring'
import { baseMinxin } from '@/views/equipments/detail/components/Mixin/baseMixin'
import Alarm from '@/views/equipments/detail/basePane/monitoring/componements/alarm'
import SystemInfo from '@/views/equipments/detail/basePane/monitoring/componements/systemInfo'
import { isArray } from '@/utils/isType'

export default {
  name: 'Monitoring',
  components: { SystemInfo, Alarm, BoardResStates },
  mixins: [baseMinxin],
  data() {
    return {}
  },
  methods: {
    getList() {
      this.loadingInit = true
      getBoardResStates(this.ip).then(res => {
        console.log(res)
        let boardResState = (((res.data || {}).devm || {}).boardResStates || {}).boardResState
        const mpuBoard = (((res.data || {}).devm || {}).mpuBoards || {}).mpuBoard
        // 构造数据
        if (!isArray(boardResState)) {
          boardResState = Array(boardResState)
        }
        const list = boardResState.map((item) => {
          if (item.entIndex === mpuBoard.entIndex) {
            return {
              isMpu: true,
              board: item,
              mpu: mpuBoard
            }
          } else {
            return {
              isMpu: false,
              board: item
            }
          }
        })

        this.list = list === undefined ? [] : list
        this.loadingInit = false
      }).catch(error => this.getListError(error))
    }
  }
}
</script>

<style scoped>
  .col{
    margin-bottom: 20px
  }
</style>
