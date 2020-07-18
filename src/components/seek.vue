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
				<li :key='itme.id' v-for="itme in songarr" @click="music(itme)">
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
				if(val !== ''){
					this.$axios.get(`https://musicapi.leanapp.cn/search?keywords=${val}&limit=30`).then((data) => {
						self.songarr = data.data.result.songs
					})
				}
			}
		},
		methods: {
			music (data) {
				this.$store.state.playsonglist = [data]
				this.$store.commit('changesrc',data.id)
				this.$store.dispatch('playsong',data.id)
				this.$store.commit('changeshow','showmusic')
				this.backhome()
			},
			backhome () {
				this.$store.commit('changeshow','showseek')
			}
		}
	}
</script>

<style lang="less">
	@import url("../css/seek.less");
</style>

