<template>
	<div class="wrapper">
		<div class="home-head">
			<ul class="home-title">
				<router-link  tag="li" key="seek" :to="{name:'menu'}" class="iconfont icon-caidan" ></router-link>
				<router-link @click.native="changenum({num: itme.num,url : itme.url})" :key="itme.title" tag="li" :to="itme.url" v-for="itme in arr" exact>{{itme.title}}</router-link>
				<router-link  tag="li" key="village" :to="{name:'seek'}" class="iconfont icon-sousuo" ></router-link>
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
	</div>
</template>

<script>
	export default {
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
				]
			}
		},
		methods: {
			changenum (data) {
				this.$store.commit('changenum',data)
			}
		},
		computed:{
			sta(){
				return this.$store.state.sta
			},
			src(){
				return this.$store.state.src
			}
		}

	
	}
</script>


<style lang="less">
	@import url("../css/home.less");
</style>
