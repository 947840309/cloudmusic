import Vue from 'vue'
import VueRouter from 'vue-router'

import me from '../components/me.vue'
import find from '../components/find.vue'
import village from '../components/village.vue'
import mv from '../components/mv.vue'
import login from '../components/login.vue'

Vue.use(VueRouter)

var router = new VueRouter({
	linkExactActiveClass: 'go',
	routes:[{
		path:'/',
		name: 'me',
		components: {
			option: me
		},
	},{
		path:'/find',
		name: 'find',
		components: {
			option: find
		}
	},{
		path:'/village',
		name: 'village',
		components: {
			option: village
		}
	},{
		path:'/mv',
		name: 'mv',
		components: {
			option: mv
		}
	},{
		path: '/login',
		name: 'login',
		components:{
			option: login
		}
	}]
})

export default router