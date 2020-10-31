const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  toposData: state => state.topos.toposData,
  templateTypes: state => state.types.templateTypes,
  unitTypes: state => state.types.unitTypes,
  functionTypes: state => state.types.functionTypes,
  neTypes: state => state.types.neTypes,
}
export default getters
