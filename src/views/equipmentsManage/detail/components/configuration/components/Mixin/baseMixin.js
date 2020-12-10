import { commonOperationMixin } from '@/views/mixins/commonOperationMixin'
import { commonNetworkMixin } from '@/views/mixins/commonNetwork'
import { commonValidateMixin } from '@/views/mixins/commonValidateMixin'

export const baseMinxin = {
  mixins: [commonNetworkMixin, commonOperationMixin, commonValidateMixin],
  computed: {
    ip() {
      return this.$route.params.ip
    }
  },
  data() {
    return {
      dataSource: '', // 标识当前的数据是那个数据库的
      list: [],
      dialogEditStatus: '',
      dialogEditShow: false,
      params: [],
      temp: {},
      loadingInit: true,
      timer: 0
    }
  },
  methods: {
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
      if (((error.response || {}).data || {}).msg) {
        const data = error.response['data']
        this.$message({ type: 'error', message: data['msg'] })
      } else {
        // 获取不到后台报错信息
        this.$message({ type: 'error', message: ' 创建失败.' })
      }
      this.loadingInit = false
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogEditStatus = 'update'
      this.dialogEditShow = true
    },
    getList() {
      /** 重写该方法，模板： **/
      // begin
      // this.loadingInit = true
      // const query = {
      //   ip: this.ip,
      //   source: this.$store.getters.source
      // }
      // then()
    },
    getListError(error) {
      console.log(error)
      // console.log(error.response)
      // 尝试获取后台报错信息
      if (((error.response || {}).data || {}).msg) {
        const data = error.response.data
        // console.log(data.msg)
        if (data.msg.match('candidate data store does not exist.') !== null) {
          // 候选数据没有创建
          this.list = []
          this.dataSource = this.$store.getters.source
          this.$message({ type: 'info', message: '开始配置并创建candidate数据库.' })
        } else {
          this.$message({ type: 'error', message: data.msg })
        }
      } else {
        // 获取不到后台报错信息
        this.$message({ type: 'error', message: ' 请求失败，请尝试刷新.' })
      }
      // 关闭加载提示
      this.loadingInit = false
    },
    getListSuccess(res, query) {
      this.params = res.params
      this.dataSource = query.source
      this.loadingInit = false
    }
  },
  mounted() {
    this.getList()
  }
}
