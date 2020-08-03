<template>
	<div class="musiclist-warpper">
		<div class="goback" :style="gsbj">
			<div class="omg">
				<p class="p-laft">
					<i class="icon-arrow-left iconfont" @click="goBack"></i>
					<span>歌单</span>
				</p>
				<p class="p-right">
					<i class="icon-search iconfont"></i>
					<i class="icon-gengduo iconfont"></i>
				</p>
			</div>
		</div>
		<ul class="infinite-list" v-infinite-scroll='load' style="overflow: auto;">
			<li class="list-head" :style="gsbj">
				<div class="headerdiv">
					<p class="songimg">
						<img :src="songbg" alt="">
					</p>
					<div class="headtext">
						<h3>{{listname}}</h3>
						<img :src="mulist.data.playlist.creator.backgroundUrl" alt="">
						<span>{{mulist.data.playlist.creator.nickname}} ></span>
					</div>
				</div>
				<div class="headicon">
					<p>
						<span class="iconfont icon-pinglun"></span>
						<small>{{mulist.data.playlist.commentCount || '评论'}}</small>
					</p>
					<p>
						<span class="iconfont icon-fenxiang"></span>
						<small>{{mulist.data.playlist.shareCount || '分享'}}</small>
					</p>
					<p>
						<span class="iconfont icon-xiazai"></span>
						<small>下载</small>
					</p>
					<p>
						<span class="iconfont icon-duoxuan"></span>
						<small>多选</small>
					</p>
				</div>
			</li>
			<li class="music" v-for="(itme,i) in mulist.data.playlist.tracks" @click="playmusic(i)">
				<span class="oindex">{{i+1}}</span>
				<p class="music-name">
					<span class="song-title">{{itme.name}}</span>
					<span class="song-zz">{{itme.ar[0].name}}</span>
				</p>
				<p class="music-icon">
					<span class="iconfont icon-shipin- "></span>
					<span class="iconfont icon-gengduo"></span>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				mulist : {
					data: {
						playlist: {
							tracks: [],
							creator: {
								backgroundUrl: '#'
							}
						}
					}
				},
				gsbj: {
					backgroundImage:  `url(${this.$store.state.gsbj})`
				},
				songid:[],
				index: 20
			}
		},
		watch:{
			songlistid(){
				this.$axios({  //第一次获取后监测歌单ID变化 如有变化就请求数据
					url: `http://api.happydouble.xyz/playlist/detail/?id=${this.songlistid}&cookie=${this.$store.state.user.data.cookie}`,
					method: 'get'
				}).then((data) => {
					this.mulist = data
					this.songid = data.data.playlist.trackIds
				})
			}
		},
		created(){  //第一次显示歌单页面获取数据
			this.$axios({
				url: `http://api.happydouble.xyz/playlist/detail/?id=${this.songlistid}&cookie=${this.$store.state.user.data.cookie}`,
				method: 'get'
			}).then((data) => {
				this.mulist = data
				this.songid = data.data.playlist.trackIds
			})
		},
		props:{
			songlistid:{  //歌单ID
				type: Number,
				default: 0
			},
			listname:{  //歌单名
				type: String,
				default: '我喜欢的音乐'
			},
			description: {  //歌单描述
				type: String,
				default: ''
			},
			songnumber: {   //歌单歌曲数目
				type: Number,
				default: 0
			},
			songbg: {    //歌单图片
				type: String,
				default: ''
			},
			playCount: {   //歌单播放次数
				type: Number,
				default: 0
			}
		},
		methods:{
			playmusic(index){
				this.$store.commit('changesonglist',[this.songid,index])
			},
			goBack(){
				this.index = 20
				this.$store.commit('changelist')
			},
			load(){
				var n = this.index,
					arr = [],
					num = 0,
					id = ''
				if(this.$store.state.showlist){
					if(n >= this.songid.length){
						return
					}else{
						num = n + 30
						if(num > this.songid.length){
							num = this.songid.length
						}
						arr = this.songid.slice(n, num)
						this.index = num
						arr.forEach(itme => {
							id += `${itme.id},`
						})
						id = id.slice(0,(id.length-1))
						this.$axios({
							url: `http://api.happydouble.xyz/song/detail`,
							method: 'post',
							data: {
								ids: id
							}
						}).then((data) => {
							this.mulist.data.playlist.tracks.push(...data.data.songs)
							if(this.index == this.songid.length){
								this.mulist.data.playlist.tracks = this.mulist.data.playlist.tracks.slice(0,this.index)
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="less">
	@import url(../css/songlist.less);
</style>
