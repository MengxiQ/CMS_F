<template>
  <div>
<!--    {{type}}-->
    <tree-tem :obj="obj"></tree-tem>
  </div>
</template>

<script>
// import {getConfigData} from '@/api/detail/interfaces'
import TreeTem from '@/views/equipments/detail/components/tree-tem'
export default {
  name:'basePane',
  components: { TreeTem },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      obj:{
    a:'12',
    b:{
      a2:'a2a2',
      b2:22,
      c3:{
        a3:'a3a3'
      }
    }
  }
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

