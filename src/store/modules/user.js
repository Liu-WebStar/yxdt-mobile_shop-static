import { login } from "@/api/user";

const user={
  state:{ 
    user:null 
  },
  getters:{},
  mutations:{
    SET_USER(state,user){
      state.user=user;
    },
  },
  actions:{
    Login({commit,state},form){
      login(form.username,form.password).then(response=>{
        const resp=response.data;
        commit('SET_USER',resp.result);
        resolve(resp);
      }).catch(error=>{ reject(error); });
    }
  }
}

export default user;