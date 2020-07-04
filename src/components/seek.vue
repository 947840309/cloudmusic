<template>
	<div class="seek-wrapper">
		<div style="background-color: rgba(0,0,0,0.3); height: 100%; width: 100%;">
			<div class="seek">
				<div>
					<p class="goback iconfont icon-fanhui" @click="backhome"></p>
					<input type="text" v-model="data">
					<p class="classify iconfont icon-geshou"></p>
				</div>
			</div>
			<ul class="infinite-list" v-infinite-scroll='' style="overflow: auto;">
				<li :key='itme.id' v-for="itme in songarr" @click="music(itme.id)">
					<div>
						<h3>{{itme.name}}</h3>
						<span>{{itme.artists[0].name}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				data : '',
				songarr : [],
			}
		},
		computed: {
			lastop() {
				return this.$store.state.lastop
			},
		},
		watch: {
			data(val){
				var self = this
				this.$axios.get(`http://musicapi.leanapp.cn/search?keywords=${val}&limit=30`).then((data) => {
					self.songarr = data.data.result.songs
				})
			}
		},
		methods: {
			music (data) {
				this.$store.commit('changesrc',data)
				this.$audio.load()
				this.$axios.get(`http://musicapi.leanapp.cn/song/detail?ids=${data}`).then((d) => {
									this.$store.commit('changesong',d.data.songs)
				})
				this.$store.commit('changeshowseek')
				setTimeout(()=>{
					this.$audio.play()
					this.$store.commit('changestate','play')
				},1000)
			},
			backhome () {
				this.$store.commit('changeshowseek')
			}
		}
	}
</script>

<style lang="less">
	@import url("../css/seek.less");
</style>
