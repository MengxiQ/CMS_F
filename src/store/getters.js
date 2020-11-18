const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  templateTypes: state => state.types.templateTypes,
  unitTypes: state => state.types.unitTypes,
  functionTypes: state => state.types.functionTypes,
  neTypes: state => state.types.neTypes,
  vendorTypes: state => state.types.vendorTypes
}
export default getters
