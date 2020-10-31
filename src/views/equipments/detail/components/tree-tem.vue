<template>
  <div v-if="hasChild">
    <h3 v-for="(item, key) in obj" :key="key" >
      {{key}}:
<!--  遍历之前-->
        <tree-tem :obj="item" v-if="hasChild"></tree-tem>
<!--   遍历之后-->
       <span v-if="typeof(item) !== 'object'">{{item}}</span>

    </h3>
  </div>
</template>

<script>
export default {
  name: "tree-tem",
  props:{
    obj:{
    }
  },
  computed: {
    hasChild(){
      // console.log(typeof(this.obj) === 'string')
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

</style>
