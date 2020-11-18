<template>
  <div>
    <pane :title="'告警统计'" @reload="getList">
      <div v-loading="loadingInit" style="min-height: 100px">
        <div ref="chart" class="chart" />
      </div>
    </pane>
  </div>
</template>

<script>
import Pane from '@/components/pane/pane'
import { monitoringMixin } from '@/views/equipments/detail/basePane/monitoring/componements/mixins/monitoringMixin'
import { getAlarmList } from '@/api/detail/monitoring/monitoring'

export default {
  name: 'Alarm',
  components: { Pane },
  mixins: [monitoringMixin],
  data() {
    return {
      statistics: {}
    }
  },
  mounted() {
  },
  methods: {
    getList() {
      this.loadingInit = true
      getAlarmList(this.ip).then(res => {
        console.log(res)
        const list = res.data.fm.alarmCfgs.alarmCfg
        const statistics = [
          { name: 'Critical', value: 0 },
          { name: 'Major', value: 0 },
          { name: 'Minor', value: 0 },
          { name: 'Warning', value: 0 }
          // { name: 'Default', value: 0 }
        ]
        list.forEach(item => {
          statistics.forEach((obj, key) => {
            if (item.level === obj.name) {
              statistics[key].value += 1
            }
          })
        })
        statistics.map((item, key) => {
          if (item.name === 'Critical') {
            statistics[key].name = '紧急'
          } else if (item.name === 'Major') {
            statistics[key].name = '重要'
          } else if (item.name === 'Minor') {
            statistics[key].name = '次要'
          } else if (item.name === 'Warning') {
            statistics[key].name = '告警'
          }
        })
        this.statistics = statistics
        console.log(this.statistics)
        this.loadingInit = false
        this.$nextTick(() => {
          this.initChart()
        })
      }).catch(error => this.getListError(error))
    },
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['紧急', '重要', '次要', '告警']
        },
        series: [
          {
            name: '告警统计',
            label: {
              formatter: '{b} : {c}'
            },
            type: 'pie',
            radius: '70%',
            data: this.statistics
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  .chart {
    width: 100%;
    min-height: 270px;
    /*background: red;*/
  }
</style>
