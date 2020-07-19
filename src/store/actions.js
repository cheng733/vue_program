import {SETUSERINFO,GETSHOPS} from './mutations-type'

export default {
  [SETUSERINFO]({commit},{user}){
    commit(SETUSERINFO,{user})
  },
  [GETSHOPS]({commit},{shops}){
    commit(GETSHOPS,{shops})
  }
}
