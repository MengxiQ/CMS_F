export const commonPagination = {
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        ip: undefined,
        name: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  methods: {

  }
}
