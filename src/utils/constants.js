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
    if (new Date(Date.parse(value)).getDate() < new Date().getDate()) {
      callback(new Error("Can't enter past dates."))
    } else {
      callback()
    }
  }, 0)
}
export const timeZones = ['US/Central', 'US/Eastern', 'US/Mountain', 'US/Pacific']
export const projectCodes = [
  { value: '2018-001-Nov', label: '2018.001 Nov - Legal 2018 Support' },
  { value: '2018-002-Bio', label: '2018.002 Bio - EOD HCP and SMA PEP Programs' },
  { value: '2018-003-Nov', label: '2018.003 Nov PLS 1st' },
  { value: '2018-005-Ver', label: '2018.005 Ver - VAKO 2018' },
  { value: '2018-007-Nov', label: '2018.007 Nov - Post ENETS 2018' },
  { value: '2018-008-Sun', label: '2018.008 Sun - Training Studio Session Support' },
  { value: '2018-008-01-Sun', label: '2018.008.01 Sun - Sainz January Fast Start' },
  { value: '2018-008-02-Sun', label: '2018.008.02 Sun - January New Hire Training' },
  { value: '2018-008-03-Sun', label: '2018.008.03 Sun - The Hospital Expert' },
  { value: '2018-008-04', label: '2018.008.04 Studio Maintenance' },
  { value: '2018-008-05-Sun', label: '2018.008.05 Sun - April New Hire Phase II' },
  { value: '2018-009-Nov', label: '2018.009 Nov - Onc VA Reimagining Access Meeting' },
  { value: '2018-011-Nov', label: '2018.011 Nov - Onc IDAPS Meeting' },
  { value: '2018-012-Nov', label: '2018.012 Nov - PLS IDAPS' },
  { value: '2018-013-Nov', label: '2018.013 Nov - Onc MA IDAPS' },
  { value: '2018-014-Nov', label: '2018.014 Nov - MMS Support Plan' },
  { value: '2018-015-Nov', label: '2018.015 Nov - Onc Franchise Head Sessions' },
  { value: '2018-016-Bio', label: '2018.016 Bio - WW Medical Speaker Meetings' },
  { value: '2018-018-Nov', label: '2018.018 Nov - Onc International Broadcast' },
  { value: '2018-019-Bio', label: '2018.019 Bio - FFT Training' },
  { value: '2018-020-Ver', label: '2018.020 Ver - Multi event contract' },
  { value: '2018-021-Nov', label: '2018.021 Nov - Additional Legal Support' },
  { value: '2018-022-Bio', label: '2018.022 Bio - Marketing Sessions' },
  { value: '2018-023-Bio', label: '2018.023 Bio - MS Patient Webinars' },
  { value: '2018-024-Nov', label: '2018.024 Nov - Segmented Marketing' },
  { value: '2018-025-GE', label: '2018.025 GE - NPI August' }
]
export const clients = ['Novartis', 'Biogen', 'Vertex', 'Sunovion', 'GE']
export const internalClients = ['Intempio', 'RVibe']
export const sowStatus = ['Client', 'Signed']
export const inviteType = ['single', 'recurring']
export const contactTypes = ['primary', 'secondary', 'internal', 'technical']
