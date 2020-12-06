<template>
  <div>
    <codemirror v-model="template.templateData" :options="cmOptions" />
  </div>
</template>

<script>
export default {
  name: 'TemplateEdit',
  props: {
    template: {},
    readOnly: {
      default() {
        return false
      }
    }
  },
  data() {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'text/xml',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        readOnly: this.readOnly
      }
    }
  }
}
</script>

<style scoped>

</style>
