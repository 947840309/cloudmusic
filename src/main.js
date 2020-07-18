import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import KimVueTouch from 'kim-vue-touch'

import home from './components/home.vue'
import router from './router/index.js'
import store from './store/store.js'

Window.prototype.$gettime = function () {
	var num = audio.currentTime,
		percent = store.state.songTime,
		f = num / 60,
		s = num % 60
	percent = Math.ceil(num/percent*100)
	f = Math.floor(f)
	s = Math.ceil(s)
	if(f < 10){
		f = '0'+ f
	}
	if(s < 10){
		s = '0'+ s
	}
	num = `${f}:${s}`
	store.commit('write',{time:num,percent})
	window.$timestate = requestAnimationFrame(window.$gettime)
}

Window.prototype.$clean = function (obj) {
	cancelAnimationFrame(obj)
}

Window.prototype.$timestate = ''

Vue.use(ElementUI)
Vue.use(KimVueTouch)

Vue.prototype.$axios = axios

var vu = new Vue({
	el: '#main',
	router,
	store,
	components: {
		home
	},
	template: "<home></home>"
})

var audio = document.getElementsByTagName('audio')[0]

Vue.prototype.$audio = document.getElementsByTagName('audio')[0]
Vue.prototype.$audio.onended = function () {
	if(vu.$store.state.opensr){
		vu.$store.dispatch('getsuiji')
		return
	}
	vu.$store.commit('changesongindex','next')
}