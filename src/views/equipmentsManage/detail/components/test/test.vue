<template>
  <el-container>
    <el-aside class="aside" :width="asideWidth">
      <el-menu router default-active="network" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-menu-item index="network">
          <i class="el-icon-s-marketing" />
          <span slot="title">PING测试</span>
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
import { detailMixins } from '@/views/equipmentsManage/detail/components/minxins/detailMixins'
export default {
  name: 'Test',
  mixins: [detailMixins]
}
</script>

<style scoped>
  .content {
    /*padding: 0px 40px;*/
  }
</style>
