import { isArray } from '@/utils/isType'

export const baseMinxin = {
  props: {
    ip: {
      type: String
    }
  },
  data() {
    return {
      list: [],
      dialogEditStatus: '',
      dialogEditShow: false,
      params: [],
      temp: {},
      loadingInit: true,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      timer: 0
    }
  },
  methods: {
    isArray(o) {
      return isArray(o)
    },
    constraint(val) {
      return val.match('CHIOCE<(?<p>.*)>').groups.p.split(',')
    },
    beforCloseDialog() {
      this.dialogEditShow = false
      this.temp = {}
    },
    handleCreate() {
      this.dialogEditStatus = 'create'
      this.dialogEditShow = true
    },
    createSuccess() {
      this.$message({ type: 'success', message: '配置成功。' })
      this.getList()
      this.dialogEditShow = false
      this.loadingInit = false
    },
    createError(error) {
      // The interface is not a L2 interface
      const data = error.response['data']
      this.$message({ dangerouslyUseHTMLString: true, type: 'error', message: ' 配置失败! <br><br>  提示信息:' + data['msg'] })
      this.loadingInit = false
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
    },
    getListError(error) {
      if (error.response) {
        const data = error.response['data']
        this.$message({ type: 'error', message: ' 请求失败，尝试刷新!   error:' + data['msg'] })
      } else {
        console.log(error)
        this.$message({ type: 'error', message: ' 请求失败，尝试刷新!' })
      }
      this.loadingInit = false
      setTimeout(_ => {
        console.log('try again!')
        this.getList()
      }, 5000)
    }
  },
  mounted() {
    this.getList()
  }
}
