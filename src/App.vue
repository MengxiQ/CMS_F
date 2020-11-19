<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('getTypes')
  }
}
</script>
<style>
  .CodeMirror{
    height: 300px !important;
  }
</style>
