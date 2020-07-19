import {SETUSERINFO,GETSHOPS} from './mutations-type'

export default {
  [SETUSERINFO](state,{user}){
    state.userInfo = user
  },
  [GETSHOPS](state,{shops}){
    state.shops = shops
  }
}
