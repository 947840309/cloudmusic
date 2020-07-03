import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		num: 1,
		sta: 'left',
		lastop: 'find',
		src: ''
	},
	mutations: {
		changenum (state,data) {
			state.lastop = data.url
			if(data.num > state.num){
				state.sta = 'right'
			}else{
				state.sta = 'left'
			}
			state.num = data.num
		},
		changesrc (state,src) {
			state.src =  `https://music.163.com/song/media/outer/url?id=${src}`
		}
	}
})

export default store