
export const typeMixin = {
  methods: {
    updateType(getterName) {
      this.$store.dispatch('getTypes').then(res => {
        // enableEdit
        const data = this.$store.getters[getterName].map(item => {
          const newItem = Object.assign({}, item)
          newItem.enableEdit = false
          return newItem
        })
        this.list = data
      }).catch(erro => {
        console.log(erro)
      })
    }
  }
}
