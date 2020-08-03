<template>
	<div class="find-wrapper">
		<ul class="find-cont" v-infinite-scroll style="overflow:auto">
			<li class="exclusive">
				<el-carousel :interval="5000" arrow="never" ref="banner" height="180px">
					<el-carousel-item v-for="item in banner" :key="">
						<img :src="item.imageUrl+'?param=600y200'" v-tap="(e) => vueTouch('d','banner')" v-swipeleft="(e) => vueTouch('z','banner')" v-swiperight="(e) => vueTouch('y','banner')">
					</el-carousel-item>
				</el-carousel>
			</li>

			<li class="tab-control">
				<ul v-infinite-scroll style="overflow:auto" :style="{height:h}">
					<li v-for="itme in tabControl" :key="" @click="changeid(itme.id)">
						<span :class="itme.icon" class="dw"></span>
						<span class="tx">
							{{itme.text}}
						</span>
					</li>
					<li>
						<span class="dw xc" @click="changeid(8)">点亮现场</span>
						<span class="tx">
							线上演出
						</span>
					</li>
				</ul>
			</li>

			<li class="song-list">
				<div class="li-title">
					<h4>宝藏歌单，值得聆听</h4>
					<span>查看更多</span>
				</div>
				<ul v-infinite-scroll style="overflow:auto" :style="{height:h}">
					<li v-for="itme in regedan" :key="">
						<img :src="itme.picUrl+'?param=200y200'" alt="">
						<span>{{itme.name}}</span>
					</li>
				</ul>
			</li>

			<li class="new-song">
				<div class="li-title">
					<h4>懂你的新曲推荐</h4>
					<span class="play" @click="newall(newsong)">全部播放</span>
				</div>
				<div class="li-song">
					<el-carousel :interval="4000" height="275px" :autoplay="false" indicator-position='none' arrow='never'  ref="rege">
						<el-carousel-item v-for="index in 4" :key="index">
							<div class="lb" v-for="itme in showli(index-1)" :key=""
								v-tap="(e) => vueTouch('d','rege')"
								v-swipeleft="(e) => vueTouch('z','rege')" 
								v-swiperight="(e) => vueTouch('y','rege')">
								<img :src="itme.album.picUrl+'?param=200y200'" alt="">
								<div class="song-name">
									<h4>{{itme.album.name}}</h4>
									<span> - {{itme.artists[0].name}}</span>
									<span>-&nbsp;{{itme.alias[0]}}</span>
								</div>
								<span class="icon iconfont icon-play" @click="playsong(itme)"></span>
							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</li>
			<br>
			<br>
			<br>
			<br>
			<br>
		</ul>
	</div>
</template>

<script>
	function suijishu (num) {
		return Math.floor((Math.random()*num) - 1 )
	}
	export default {
		data() {
			return {
				banner: [],
				regedan: [],
				newsong: [],
				tabControl: [{
					icon: 'iconfont icon-meirituijian-',
					text: '每日推荐',
					id: '0'
				}, {
					icon: 'iconfont icon-gedan',
					text: '歌单',
					id: '1'
				}, {
					icon: 'iconfont icon-paixingbang',
					text: '排行榜',
					id: '2'
				}, {
					icon: 'iconfont icon-wodediantai',
					text: '电台',
					id: '3'
				}, {
					icon: 'iconfont icon-sirenfm-copy-copy',
					text: '私人FM',
					id: '4'
				}, {
					icon: 'iconfont icon-huo',
					text: '火前留名',
					id: '5'
				}, {
					icon: 'iconfont icon-ziyuan',
					text: '数字专辑',
					id: '6'
				}, {
					icon: 'iconfont icon-liaotian',
					text: '唱聊',
					id: '7'
				}],
				h: window.innerWidth + 'px'
			}
		},
		mounted() {
			var songs = '' //获取的推荐音乐全列表
			//获取首页轮播图
			if(!sessionStorage.banner){
				this.$axios.get(`http://api.happydouble.xyz/banner`).then((data) => {
					this.banner = data.data.banners
					sessionStorage.banner = JSON.stringify(this.banner)
				})
			}else{
				this.banner = JSON.parse(sessionStorage.banner)
			}
			//获取推荐歌单列表
			if(!sessionStorage.result){
				this.$axios.get(`http://api.happydouble.xyz/personalized?limit=10`).then((data) => {
					this.regedan = data.data.result
					sessionStorage.regedan = JSON.stringify(this.regedan)
				})
			}else{
				this.regedan = JSON.parse(sessionStorage.regedan)
			}
			//获取推荐音乐
			if(!sessionStorage.newsongs){
				this.$axios.get(`http://api.happydouble.xyz/top/song?type=0`).then((data) => {
					songs = data.data.data
					sessionStorage.newsongs = JSON.stringify(songs)
					getsongs(this)
				})
			}else{
				songs = JSON.parse(sessionStorage.newsongs)
				getsongs(this)
			}
			function getsongs(my){
				var str = ''
				for(let i = 0; i < 12; i ++){
					var a = songs[suijishu(100)]
					if(str.indexOf(`${a.id}`) != -1){
						i -= 1
						continue
					}
					str += `${a.id}.`
					if(a){
						my.newsong.push(a)
					}else{
						my.newsong.push(songs[suijishu(100)])
					}
				}
			}
		},
		methods: {
			vueTouch(a,data) {
				switch (a) {
					case 'z':
						this.$refs[data].next()
						return
					case 'y':
						this.$refs[data].prev()
						return
					case 'd':
						return
				}
			},
			showli(i){
				if(this.newsong == ''){
					return
				}
				i *= 3
				var arr = []
				for(var a = 0; a < 3; a++){
					arr.push(this.newsong[i+a])
				}
				return arr
			},
			changeid(id){
				console.log(id)
			},
			playsong(id){  //推荐新音乐播放
				this.$store.state.playsonglist = [id]
				this.$store.commit("changesrc", id.id)
				this.$store.dispatch('playsong', id.id)
			},
			newall(arr){  //全部播放
				console.log(arr)
				this.$store.commit('changesonglist',[arr])
			}
		}
	}
</script>

<style lang="less">
	@import url("../css/find.less");
</style>
