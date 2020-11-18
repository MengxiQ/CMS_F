<template>
  <div class="card-panel">
    <div class="title">{{title}}
      <el-link
        title="刷新"
        style="font-size: larger; float: right"
        type="primary"
        class="el-icon-refresh"
        @click="$emit('reload')"></el-link>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pane',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>
  .card-panel {
    /*height: 108px;*/
    width: 400px;
    height: 300px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

  }
  .title {
    padding: 5px;
    font-size: larger;
    color: #2b2f3a;
    background: #dbdbdc;
  }
  .content{
    padding: 10px;
  }
</style>
