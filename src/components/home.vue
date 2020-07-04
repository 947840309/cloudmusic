<template>
	<div class="wrapper">
		<div class="home-head">
			<ul class="home-title">
				<li class="iconfont icon-caidan" @click="showm"></li>
				<router-link @click.native="changenum({num: itme.num,url : itme.url})" :key="itme.title" tag="li" :to="itme.url" v-for="itme in arr" exact>{{itme.title}}</router-link>
				<li class="iconfont icon-sousuo" @click="showm"></li>
			</ul>
		</div>
		<transition :name="sta">
			<router-view name="option"></router-view>
		</transition>
		<transition name="menu">
			<router-view name="menu"></router-view>
		</transition>
		<transition name="seek">
			<router-view name="seek"></router-view>
		</transition>
		<audio :src="src"></audio>
		
		<el-drawer class='drawer1' :visible.sync="drawer" direction="btt" :show-close="false" :modal="false" :wrapperClosable="false" size="100%" :withHeader="false">
			<div class="song-wrapper" :style="bagurl">
				<img :src="song.al.picUrl" alt="">
				<div>
					<h4>{{song.al.name}}</h4>
					<span>{{song.ar[0].name}}</span>
				</div>
				<button class="list iconfont icon-liebiao"></button>
				<button class="play iconfont" @click="play" :class="icon" :state="state"></button>
			</div>
		</el-drawer>
		
		<el-drawer :show-close="false" direction="ltr" :visible.sync="showmenu" size="80%" :withHeader="false">
			<div class="mymenu">
				<mymenu></mymenu>
			</div>
		</el-drawer>
		
		<el-drawer :show-close="false" direction="btt" :visible.sync="showseek" :wrapperClosable='false' size="100%" :withHeader="false">
			<seek></seek>
		</el-drawer>
	</div>
</template>

<script>
	import blurImg from '../gaussFun.js'
	import mymenu from './menu.vue'
	import seek from '../components/seek.vue'
	export default {
		beforeCreate(){
				var img = document.createElement('img'),
					me = this
				img.src = '/img/12.05d659a4.jpg'
				img.onload = function(){
					me.bagurl = {
							backgroundImage: `url(${blurImg(img)})`
					}
				}
			},
		data: function() {
			return {
				arr: [{
						url: {
							path: '/'
						},
						title: '我的',
						num: 1
					},
					{
						url: {
							name: 'find'
						},
						title: '发现',
						num: 2
					},
					{
						url: {
							name: 'village'
						},
						title: '云村',
						num: 3
					},
					{
						url: {
							name: 'mv'
						},
						title: '视频',
						num: 4
					}
				],
				bagurl : '',
				icon : 'icon-zanting',
				showmenu : false,
			}
		},
		methods: {
			changenum (data) {
				this.$store.commit('changenum',data)
			},
			play () {
				if(!this.$audio.paused){
					this.$audio.pause()
					this.$store.commit('changestate','stop')
				}else{
					this.$audio.play()
					this.$store.commit('changestate','play')
				}
			},
			showm (e) {
				if(e.path[0].className == 'iconfont icon-sousuo'){
					this.$store.commit('changeshowseek')
				}else if(e.path[0].className == 'iconfont icon-caidan'){
					this.showmenu = !this.showmenu
				}
			}
		},
		computed:{
			sta(){
				return this.$store.state.sta
			},
			src(){
				return this.$store.state.src
			},
			drawer(){
				return this.$store.state.drawer
			},
			song(){
				if(this.$store.state.song == ''){
					var song
					return song = {
						al: {
							picUrl : '#',
							name : '未播放歌曲'
						},
						ar: [{
							name : ''
						}]
					}
				}
				return this.$store.state.song
			},
			state() {
				if(this.$store.state.audiostate == 'stop'){
					this.icon = 'icon-icon_zanting'
				}else if (this.$store.state.audiostate == 'play'){
					this.icon = 'icon-zanting'
				}
				return this.$store.state.audiostate
			},
			showseek () {
				return this.$store.state.showseek
			}
		},
		components: {
			mymenu,
			seek
		}
	}
</script>


<style lang="less">
	@import url("../css/home.less");
</style>
