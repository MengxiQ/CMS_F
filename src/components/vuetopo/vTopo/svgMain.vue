<template>
    <div class="svgMain">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'SvgMain'
}
</script>

<style scoped>
  .svgMain {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex: 1;
  }
</style>
