import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import home from './components/home.vue'
import router from './router/index.js'
import store from './store/store.js'
import blurImg from './gaussFun.js'

Vue.use(ElementUI)
Vue.prototype.$axios = axios
var vu = new Vue({
	el: '#main',
	router,
	store,
	components: {
		home
	},
	template: "<home></home>",
})

Vue.prototype.$audio = document.getElementsByTagName('audio')[0]
	