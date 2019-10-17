import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


//第三步：创建store实例
const store = new Vuex.Store({
    state: {
        dataList: '',

    },
    getters: {},
    //params1:state;params2:playload
    mutations: {
        init_data(state, playload) {
            // sessionStorage.setItem('state.dataList', JSON.stringify(playload))
            state.dataList = playload;
        }
    },
    actions: {},


})

export default store;