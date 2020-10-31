<template>
  <div v-if="hasChild">
    <div class="input-item"  v-for="(item, key) in obj" :key="key">
      <span :class="{'spineNode': item !== null && typeof(item) === 'object' }" style="display:block;min-width: 100px; line-height: 25px;float: left" >{{key}}:</span>
      <tree-form :obj="item" v-if="hasChild" ></tree-form>
<!--      如果不允许编辑disabled = true，动态绑定class-->
       <input  class="input-item-input" v-if="item === null || typeof(item) === 'string' || typeof(item) === 'number' " :name="key" :value="item" />
      </div>
<!--    <div style="margin: 10px 0; background: #66b1ff; height: 2px; width: 150px" ></div>-->
  </div>
</template>

<script>
export default {
  name: "tree-form",
  props:{
    obj:{
    }
  },
  computed: {
    hasChild(){
      // console.log(this.obj,typeof this.obj,this.obj === null)
      // console.log(typeof(this.obj) === 'string')
      if (this.obj === null) {
        return false
      }
      if (typeof(this.obj) === 'string') {
        return false
      }
      if (typeof(this.obj) === 'number') {
        return false
      }
      else {
        return true
      }
    }

  }
}
</script>

<style scoped>
.input-item{
  margin: 10px 0;
}
.input-item-input {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;

    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 200px;
}

.spineNode{
    color: #292121;
    width: 100%;
    margin-top: 10px;
    font-size: larger;
    padding: 10px 0;
    font-weight: bold;
}
</style>
