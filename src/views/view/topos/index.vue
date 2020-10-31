<template>
  <div class="topos">
    <el-row>
      <el-col :span="6"><div class="left-contair" v-if="!editable">
        <h3 class="menu-title">拓扑列表
          <el-button style="right: 0px" class="menu-btn" size="mini" type="" @click="addTopo">添加</el-button>
          <el-button style="right: 55px"
                     class="menu-btn"
                     size="mini"
                     type=""
                     @click="isManage = !isManage"
          >管理</el-button>
        </h3>
        <ul class="menu">
          <li
            v-for="(item, key) in toppsList"
            :key="key"
            class="menu-item"
            :class="{'menu-item-active': isActive === key}"
            @click="gotoDetail(key)"
          >
            <i class="el-icon-s-marketing" style="margin-right: 5px"></i>{{ item.name }}
            <i class="el-icon-delete delete-item" v-show="isManage" @click="deleteItem(item.name)"></i>
          </li>
        </ul>
        <el-button v-show="isManage"
                   style="transform: scale(0.8)"
                   type="danger"
                   size="mini"
                   icon="el-icon-delete">删除</el-button>
      </div>
      </el-col>
      <el-col :span="rightSpan">
        <div class="right-contair">
          <div class="topo-title" :class="{'editableHeard':editable}" ><span v-if="!editable">{{this.toppsList[this.isActive].name}}</span>
            <el-button type="" size="mini" style="float: right; margin-right: 5px;margin-top: 1px; display: inline-block; transform: scale(0.9)"
                       @click="editable = ! editable"
                       v-if="!editable" >编辑</el-button>
            <el-button type="" size="mini" style="float: right; margin-right: 5px;margin-top: 1px; display: inline-block; transform: scale(0.9)"
                       @click="saveTopo"
                       v-if="editable" >保存</el-button>
          </div>
         <Detail :topo-data="activeTopo" :editable="editable"></Detail>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from '@/views/view/topos/detail/index'
export default {
  name: 'Topos',
  components: { Detail },
  proprs: {

  },
  data() {
    return {
      isManage:false,
      // toppsList: [
      //   {
      //     'id': 'a001',
      //     'name': 'topo1',
      //     'label': '拓扑01'
      //   },
      //   {
      //     'id': 'a001',
      //     'name': 'topo2',
      //     'label': '拓扑02'
      //   },
      //   {
      //     'id': 'a001',
      //     'name': 'topo3',
      //     'label': '拓扑03'
      //   }
      // ]
      activeTopo:{

      },
      isActive:0,
      editable:false
    }
  },
  computed: {
    // isActive() {
    //   return this.$route.params['name']
    // },
    toppsList() {
      return this.$store.getters.toposData
    },
    rightSpan() {
      if (this.editable){
        return 24
      }else {
        return 18
      }

    }
  },
  methods: {
    gotoDetail(key) {
      // this.$router.push('/view/topos/detail/' + name)
      this.isActive = key
      this.activeTopo = this.toppsList[key]
    },
    addTopo(){
      this.$router.push('/view/edit')
    },
    deleteItem(name,key){
      // 这里应该是commit
      // console.log(this.$store.state.toposData)
      // this.$store.state.toposData.splice(key,1)
      this.$store.commit('deleteTopoItem',key)
      this.$message({type:'success',message:'删除成功'})
    },
    saveTopo(){
      this.$store.commit('saveTopo',this.activeTopo)
      this.$message({type:'success',message:'保存成功'})
      this.editable = false
    }
  },
  mounted() {
    this.activeTopo = this.toppsList[this.isActive]
  }
}
</script>

<style scoped>
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .topos{
    width: 100%;
  }
  .left-contair{
    background: #fdfdfd;
    width: 100%;
    height: 100vh;
    border-right: rgba(0,0,0,0.1) 1px solid;
  }
  .right-contair{
    background: white;
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .menu-title{
    margin: 10px 0 10px 5px;
    font-size: 14px;
    line-height: 20px;
    background: #f3f3f3;
    color: #343740;
    border-left: #20a0ff 4px solid;

  }

  .menu-title{
    padding: 5px;
    position: relative;
  }

  .menu{
    width: 100%;
    height: 100px;

  }
  .menu-item{
    text-align: left;
    width: 100%;
    padding: 5px 5px 5px 20px;
    font-size: smaller;
    display: block;
  }
  .menu-item-active{
    background: #d6ebfc;
  }
  .menu-item:hover{
    background: #d6ebfc;
    cursor: pointer;
  }
  .menu-btn{
    transform: scale(0.8);
    margin: 0;
    position: absolute;
    top: 2px;
  }
  .delete-item{
    float: right;
    color: #ff0000;
    margin-right: 5px;
  }
  .delete-item:hover{
    /*transform: scale(1.1);*/
    font-weight: bold;
  }
  .topo-title{
    height: 30px;
    line-height: 30px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 100;
    text-align: center;
    font-size: larger;
    background: rgba(0,0,0,0.1);
    color: #525255;
  }
  .editableHeard{
    height: 37px;
    width: 200px;
    right: 2px;
    top: 2px;
    background: rgb(245,247,250);
    /*background: red;*/
    padding-top: 4px;
  }
</style>
