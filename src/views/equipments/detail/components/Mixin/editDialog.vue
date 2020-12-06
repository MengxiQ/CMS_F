<template>
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
        <el-select
          v-if="(item.constraint).match('CHIOCE<(?<p>.*)>')"
          v-model="temp[item.name]"
        >
          <el-option
            v-for="(i, k) in constraint(item.constraint)"
            :key="k"
            :value="i"
            :label="i"
          />
        </el-select>
        <el-switch
          v-if="item.constraint === 'BOOLEAN'"
          v-model="temp.defRoutEnableFlag"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="false"
          :inactive-value="true"
        />
        <el-input
          v-if="item.constraint.match('INT<?(?<p>.*)>?') || item.constraint === 'IP' || item.constraint === 'MASK' || item.constraint === 'WILDCARD' || item.constraint === 'STRING'"
          v-model="temp[item.name]"
          :disabled="item.name === 'processId'"
        />
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24" style="text-align: right">
        <el-button type="primary" size="mini" @click="handleSave()">保存</el-button>
        <el-button type="" size="mini" @click="dialogEditShow = !dialogEditShow">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    dialogEditShow: {
      type: Boolean,
      default() {
        return false
      }
    },
    dialogEditStatus: {
      type: String
    },
    params: {
      type: Array,
      default() {
        return []
      }
    },
    tempData: {
      type: Object
    }
  },
  data() {
    return {
      temp: {}
    }
  },
  methods: {
    constraint(val) {
      return val.match('CHIOCE<(?<p>.*)>').groups.p.split(',')
    },
    beforCloseDialog() {
      this.dialogEditShow = false
    },
    handleSave() {
      // 将最终的数据返回给父组件
      this.$emit('handleSave', this.temp)
    }
  }
}
</script>

<style scoped>

</style>
