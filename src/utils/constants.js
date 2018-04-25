export const requiredValidator = {
  required: true,
  message: 'This field is required.',
  trigger: 'change'
}
export const emailValidator = {
  type: 'email',
  message: 'Please input correct email address',
  trigger: 'change'
}
export const checkDate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('This field is required'))
  }
  setTimeout(() => {
    if (new Date(Date.parse(value)) < new Date()) {
      callback(new Error("Can't enter past dates."))
    } else {
      callback()
    }
  }, 0)
}
export const timeZones = ['US/Central', 'US/Eastern', 'US/Mountain', 'US/Pacific']
export const clients = ['Novartis', 'Biogen', 'Vertex', 'Sunovion', 'GE']
export const internalClients = ['Intempio', 'RVibe']
export const sowStatus = ['Client', 'Signed']
export const inviteType = ['single', 'recurring']
export const contactTypes = ['primary', 'secondary', 'internal', 'technical']
