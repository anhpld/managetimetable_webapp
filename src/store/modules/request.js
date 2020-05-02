import { uploadFile, getList, getListGeneration, startArrange, stopArrange, setAsDefault } from '@/api/request'

const state = {
  listReport: [],
  listGeneration: [],
  startInterval: ''
}

const mutations = {
  UPLOAD_FILE: (state, data) => {
    state.listReport = data
  },
  GET_LIST: (state, data) => {
    state.listReport = data
  },
  GET_LIST_GENERATION: (state, data) => {
    state.listGeneration = data
  },
  START_ARRANGE: (state, data) => {
    state.listGeneration = data
  },
  START_INTERVAL: (state, data) => {
    state.startInterval = data
    console.log('state.startInterval', state.startInterval)
  }
}

const actions = {
  uploadFile({ commit }, data) {
    console.log('aaa')

    return new Promise((resolve, reject) => {
      uploadFile({ data }).then(response => {
        commit('UPLOAD_FILE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getList(data).then(response => {
        commit('GET_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getListGeneration({ commit }, data) {
    return new Promise((resolve, reject) => {
      getListGeneration(data).then(response => {
        commit('GET_LIST_GENERATION', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  startArrange({ commit }, data) {
    return new Promise((resolve, reject) => {
      startArrange(data).then(response => {
        commit('START_ARRANGE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  stopArrange({ commit }, data) {
    return new Promise((resolve, reject) => {
      stopArrange(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  setAsDefault({ commit }, data) {
    return new Promise((resolve, reject) => {
      setAsDefault(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  startInterval({ commit }, data) {
    commit('START_INTERVAL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

