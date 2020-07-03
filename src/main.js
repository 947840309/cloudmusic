import Vue from 'vue'
import home from './components/home.vue'
import router from './router/index.js'
import store from './store/store.js'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.prototype.$axios = axios
new Vue({
	el: '#main',
	router,
	store,
	components: {
		home
	},
	template: "<home></home>"
})

Vue.prototype.$audio = document.getElementsByTagName('audio')[0]