
const state = {
  toposData: [
    {
        'name': 'topo1',
        'nodes': [],
        'connectors': []
      },
    {
        'name': 'topo2',
        'nodes': [],
        'connectors': []
      }

  ]
}

const mutations ={
  saveTopo(state,data){
    state.toposData.push(data)
  },
  deleteTopoItem(state,key){
    state.toposData.splice(key,1)

  }
}

const actions = {

}

export default {
  namespace:true,
  state,
  mutations,
  actions
}
