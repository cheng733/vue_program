import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
      latitude:'40.10038',
      longitude:'116.36867',
      userInfo:{},
      shops:[]
  },
  mutations,
  actions
})
