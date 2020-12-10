<template>
  <el-container>
    <el-aside class="aside" :width="asideWidth">
      <el-button-group style="position: absolute; z-index: 1000; left: 0; top: 30px">
        <el-button v-show="isCollapse" size="mini" icon="el-icon-s-unfold" @click="unfold" />
        <el-button v-show="!isCollapse" size="mini" icon="el-icon-s-fold" @click="fold" />
      </el-button-group>
      <el-menu router default-active="base" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="base">
          <i class="el-icon-menu" />
          <span slot="title">基本信息</span>
        </el-menu-item>
        <!--        <el-menu-item index="3">-->
        <!--          <i class="el-icon-document" />-->
        <!--          <span slot="title">告警通知</span>-->
        <!--        </el-menu-item>-->
        <el-menu-item index="syslog">
          <i class="el-icon-notebook-2" />
          <span slot="title">设备日志</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="page-content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'MonitoringBase',
  data() {
    return {
      isCollapse: true,
      asideWidth: '65px'
    }
  },
  computed: {
    ip() {
      return this.$route.params.ip
    }
  },
  created() {
    // console.log(this.$route.params.ip)
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    fold() {
      this.asideWidth = '65px'
      this.isCollapse = true
    },
    unfold() {
      this.asideWidth = '150px'
      this.isCollapse = false
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
}
.el-submenu__icon-arrow {
     display: inline-block !important;
}
.el-menu--vertical .nest-menu .el-submenu > .el-submenu__title:hover, .el-menu--vertical .el-menu-item:hover{
    background-color: #ecf5ff !important;
}
.aside {
  transition: width 0.1s;
}
</style>

