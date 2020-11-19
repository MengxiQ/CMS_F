<template>
  <div class="content">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Send" name="1">
        <el-row style="background: #f7f7f7">
          <el-col span="17" class="left">
            <codemirror v-model="sendCodeData" :options="sendCmOptions" /></el-col>
          <el-col span="7" class="right">
            <i class="el-icon-refresh refresh" title="重置" @click="handleReset" />
            <el-form size="mini" label-position="left" label-width="60px">
          <el-form-item label="IP地址">
            <el-input v-model="temp.ip" placeholder="设备IP地址" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="temp.username" placeholder="NetConf用户名" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="temp.password" placeholder="NetConf用户密码" type="" />
          </el-form-item>
          <el-form-item label="端口号">
            <el-input v-model="temp.port" placeholder="端口号" />
          </el-form-item>
          <el-form-item label="厂商" placeholder="厂商标识符">
            <el-select v-model="temp.device_params">
              <el-option label="华为" value="huawei" />
              <el-option label="锐捷" value="ruijie" />
              <el-option label="思科" value="cisco" />
            </el-select>
          </el-form-item>
          <el-form-item label="HostKey">
            <el-input
              v-model="temp.hostkey"
              placeholder="请输入HostKey"
              type="textarea"
              :autosize="{ minRows: 1, }"
            />
          </el-form-item>
          <el-form-item>
            <el-button style="float: right" size="mini" type="primary">发送</el-button>
          </el-form-item>
        </el-form>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="response" name="2">
        <div style="background: #e6e8ea; padding: 10px">
          <codemirror v-model="resCodeData" :options="resCmOptions" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      sendCodeData: '<!-- 编辑模板... -->\n',
      resCodeData: '<!-- 返回的信息... -->\n',
      sendCmOptions: {
        tabSize: 4,
        mode: 'text/xml',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        readOnly: false
      },
      resCmOptions: {
        tabSize: 4,
        mode: 'text/xml',
        theme: 'base16-dark',
        lineNumbers: false,
        line: true,
        readOnly: true
      },
      temp: {
        'ip': '',
        'equipment': '',
        'username': '',
        'password': '',
        'port': 22,
        'device_params': 'huawei',
        'hostkey': null
      }
    }
  },
  methods: {
    handleChange(val) {
    },
    handleReset() {
      this.temp = {
        'ip': '',
        'equipment': '',
        'username': '',
        'password': '',
        'port': 22,
        'device_params': 'huawei',
        'hostkey': null
      }
    }
  }
}
</script>

<style scoped>
.left{
  padding-top: 20px;
}
.right {
  background: #f6f6f6;
  height: auto;
  padding: 20px;
  padding-bottom: 0;
  position: relative;
}

.refresh {
  color: coral;
  position: absolute;
  top: 4px;
  left: 4px;
  font-weight: bolder;
}

.refresh:hover {
  cursor: pointer;
}
.content {
  padding: 10px;
}
</style>
