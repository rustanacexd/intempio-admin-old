const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  fullname: state => state.user.fullname,
  role: state => state.user.role,
  roles: state => state.user.roles,
  username: state => state.user.username,
  biogenProjectCodes: state => state.project.biogenProjectCodes,
  sunovionProjectCodes: state => state.project.sunovionProjectCodes,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  isClient: state => state.user.roles.includes('client')
}
export default getters
