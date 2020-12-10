<template>
  <div style="height: 500px; border: 1px solid #eee">
    <!--    <h1 style="font-size: 18px; color: #6f7180;font-weight: bolder"> 配置详情 &nbsp; [IP ：<span style="color: #3d7ed5">{{ ip }}</span>]</h1>-->
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" style="margin-left: 20px">
        <el-menu-item index="monitoring">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">监控</span></el-menu-item>
        <el-menu-item index="configuration">
          <i class="el-icon-setting"></i>
          <span slot="title">配置</span></el-menu-item>
        <el-menu-item index="test">
          <i class="el-icon-discover"></i>
          <span slot="title">测试</span></el-menu-item>
        <el-menu-item index="maintain">
          <i class="el-icon-suitcase"></i>
          <span slot="title">维护</span></el-menu-item>
        <el-menu-item index="configuration/manage/setting" style="float: right;">
          <span slot="title">
            <span style="font-size: smaller;display: inline-block;height: 40px;width:100px;position: relative">
              <span style="display: block;height: 10px; position: absolute; top: -20px">ip：{{ip}}</span>
              <span style="display: block; height: 10px; position: absolute">数据库：{{this.$store.getters.source}}</span>
            </span>
          </span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
    }
  },
  computed: {
    ip() {
      return this.$route.params.ip
    },
    activeIndex() {
      const fullpath = this.$route.path
      // console.log(fullpath)
      // */192.168.100.101/configuration/vlan/list
      const p = fullpath.match('/(?<path>monitoring|configuration|maintain|test)')
      if (p !== null) {
        // console.log(p.groups)
        return p.groups.path
      } else {
        return 'monitoring'
        // return ret.groups.path
      }
      // console.log(this.$route.path.match('/(?<path>[a-z][A-Z]*)$').groups.path)
    }
  },
  created() {

  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(this.$route.path)
      // console.log(key)
      this.$router.push({ path: '/equipmentsManage/detail/' + this.ip + '/' + key })
    }
  }
}
</script>

<style>
/*解决tab页超过屏幕高度不能滚动的问题, 100vh - (两头部两个的高度+10px)*/
.page-content {
    height: calc(100vh - 120px);
    overflow-y: scroll;
    /*padding-bottom: 100px;*/
  }
</style>
