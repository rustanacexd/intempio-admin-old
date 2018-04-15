const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  fullname: state => state.user.fullname,
  role: state => state.user.role,
  username: state => state.user.username
}
export default getters
