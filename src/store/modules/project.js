import { fetchProjectCodes } from '@/api/project'

const project = {
  state: {
    biogenProjectCodes: [],
    sunovionProjectCodes: []
  },

  mutations: {
    SET_BIOGEN_PROJECT_CODES: (state, data) => {
      state.biogenProjectCodes = data
    },
    SET_SUNOVION_PROJECT_CODES: (state, data) => {
      state.sunovionProjectCodes = data
    }
  },

  actions: {
    FetchProjectCodes({ commit }, clientName) {
      fetchProjectCodes({ client: clientName }).then(projectCodes => {
        switch (clientName) {
          case 'Biogen':
            commit('SET_BIOGEN_PROJECT_CODES', projectCodes)
            break
          case 'Sunovion':
            commit('SET_SUNOVION_PROJECT_CODES', projectCodes)
            break
        }
      })
    }
  }
}

export default project
