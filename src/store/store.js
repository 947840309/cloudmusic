import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var store = new Vuex.Store({
	state: {
		num: 1,   //轮播图序号
		sta: 'left', //轮播图切换方向
		lastop: 'find',  //轮播图切换方向
		src: '',   //歌曲的播放链接
		drawer : false,  //底部播放控件展示状态
		song : '',         //搜索出来的歌曲列表
		audiostate: 'stop',  //audio 播放状态
		showseek : false ,   //搜索页面展示状态
		showmusic : false,   //音乐播放页面的展示状态
		songTime : 0,        //歌曲时长
		songtime : '00:00',   //播放页面歌曲时间显示
		time: '00:00',        //播放时间展示
		percent: 0,          //进度条百分比
		playsonglist: [],     //歌曲播放列表
		songindex: 0,         //当前播放歌曲在歌曲列表中的索引
		user: '',			//登录后用户的数据
		detail: '',      //用户细节
		usersonglist: '',  //用户歌单列表
		opensr: false
	},
	mutations: {
		changenum(state,data) {  //轮播图切换方式
			state.lastop = data.url
			if(data.num > state.num){
				state.sta = 'right'
			}else{
				state.sta = 'left'
			}
			state.num = data.num
		},
		changesrc(state,src) {   //添加音乐播放src
			state.src =  `https://music.163.com/song/media/outer/url?id=${src}`
			state.drawer = true
		},
		changesong(state,song){
			state.song = song[0]
		},
		changestate(state, data) {   //音乐播放状态
			state.audiostate = data
		},
		changeshow(state,num){  //选择显示那个页面
			switch (num) {
				case 'showseek' :
					state.showseek = !state.showseek
					break
				case 'showmusic' : 
					state.showmusic = !state.showmusic
			}
		},
		stime(state,time) {
			state.songtime = time
		},
		write(state,obj) {
			state.time = obj.time 
			state.percent = obj.percent
		},
		ytime(state,time) {
			state.songTime = time
		},
		changesonglist(state,list){  //传入播放列表
			state.playsonglist = list
			this.commit('changesongindex',' ')
		},
		changesongindex(state,data){
			if(data === 'next'){
				state.songindex += 1
			}else if(data === 'last'){
				state.songindex -= 1
			}
			if(state.songindex > state.playsonglist.length - 1){
				state.songindex = 0
			}else if(state.songindex < 0){
				state.songindex = state.playsonglist.length - 1
			}
			this.commit('changesrc',state.playsonglist[state.songindex].id)
			this.dispatch('playsong',state.playsonglist[state.songindex].id)
		},
		login(state,data){  //用户登录的基本信息
			state.user = data
		},
		userdetail(state,data){  //用户的详细信息
			state.detail = data
			this.dispatch('usersong',data.data.profile.userId)
		},
		usersongarr(state,data){ //改变用户歌单信息
			state.usersonglist = data.data.playlist
		},
		changesr(state){
			state.opensr = !state.opensr
			if(state.opensr){
				this.dispatch('getsuiji')
			}
		}
	},
	actions:{
		getsuiji(state){  //获取随机播放音乐的ID
			var d = new Date
			Vue.prototype.$axios.get(`http://music.happydouble.xyz/personal_fm?data=${d.getTime()}`).then((d) => {
				state.commit('changesrc',d.data.data[0].id)
				state.dispatch('playsong',d.data.data[0].id)
			}).catch((err)=> {
				console.log(err,'获取失败!尝试重新获取！！')
				state.dispatch('getsuiji')
			})
		},
		playsong(state,id){   //播放音乐
			Vue.prototype.$axios.get(`http://music.happydouble.xyz/song/detail?ids=${id}`).then((d) => {
								state.commit('changesong',d.data.songs)
			})
			Vue.prototype.$audio.load()
			Vue.prototype.$audio.onloadeddata = function(e){
				this.play()
				state.commit('stime',this.duration)	
				state.commit('changestate','play')
				window.$gettime()	
			}
		},
		usersong(state,id){  //获取用户歌单列表
			Vue.prototype.$axios.get(`http://music.happydouble.xyz/user/playlist?uid=${id}`).then((d) => {
				state.commit('usersongarr',d)
			})
		}
	}
})

export default store
