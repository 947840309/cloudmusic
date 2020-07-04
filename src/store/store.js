import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		num: 1,
		sta: 'left',
		lastop: 'find',
		src: '',
		drawer : false,
		song : '',
		audiostate: 'stop',
		showseek : false 
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
			state.drawer = true
		},
		changesong (state,song){
			state.song = song[0]
		},
		changestate (state, data) {
			state.audiostate = data
		},
		changeshowseek (state){
			state.showseek = !state.showseek
		}
	}
})

export default store