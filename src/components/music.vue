<template>
	<div class="music-wrapper" :backurl="backurl" :style="{ backgroundImage: `url(${burl})` }">
		<div class="music-title">
			<p class="iconfont icon-fanhui" @click="show"></p>
			<div class="text">
				<h4>{{ song.name }}</h4>
				<span>{{ song.singer }}</span>
			</div>
			<p class="iconfont icon-fenxiang"></p>
		</div>

		<div class="music-dial"><musicdial size="100%" :imgstop="runimg" :imgsrc="imgsrc"></musicdial></div>

		<div class="control">
			<div class="music-icon">
				<ul>
					<li v-for="itme in icon" :class="itme.icon"></li>
				</ul>
			</div>
			<div class="when">
				<span>{{ gettime }}</span>
				<div class="prog"><el-progress :percentage="percentage" :stroke-width="1" :show-text="false" color="#909399"></el-progress></div>
				<span>{{ songTime }}</span>
			</div>
			<div class="music-control">
				<ul>
					<li class="iconfont" :class="zhuangtai" @click="loop"></li>
					<li class="iconfont icon-xiayishou32" @click="changesongindex('last')"></li>
					<li class="iconfont" :class="bofang" @click="oclick" :state="state"></li>
					<li class="iconfont icon-shangyishou" @click="changesongindex('next')"></li>
					<li class="iconfont icon-liebiao"></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import blurImg from '../gaussFun.js';
import musicdial from './musicdial.vue';
function newimg(src, obj) {
	var img = document.createElement('img');
	img.src = src;
	img.crossOrigin = 'anonymous';
	img.onload = function() {
		obj.burl = blurImg(img);
	};
}

export default {
	data() {
		return {
			burl: '',
			icon: [
				{
					icon: 'iconfont icon-xihuan'
				},
				{
					icon: 'iconfont icon-iconfontzhizuobiaozhun43'
				},
				{
					icon: 'iconfont icon-maikefeng'
				},
				{
					icon: 'iconfont icon-liuyan'
				},
				{
					icon: 'iconfont icon-gengduo'
				}
			],
			bofang: 'icon-zanting',
			xunhuan: 'icon-liebiaoxunhuan'
		};
	},
	watch: {
		burl() {
			this.burl = this.burl;
		}
	},
	methods: {
		show() {
			this.$store.commit('changeshow', 'showmusic');
		},
		oclick(e) {
			e.stopPropagation();
			if (!this.$audio.paused) {
				this.$audio.pause();
				this.$store.commit('changestate', 'stop');
				window.$clean(window.$timestate);
			} else {
				this.$audio.play();
				this.$store.commit('changestate', 'play');
				window.$gettime();
			}
		},
		changesongindex(data) {
			if(this.$store.state.opensr){
				this.$store.dispatch('getsuiji')
				return
			}
			this.$store.commit('changesongindex', data);
		},
		loop() {
			this.$audio.loop = !this.$audio.loop;
			if (this.$audio.loop) {
				this.xunhuan = 'icon-danquxunhuan';
			} else {
				this.xunhuan = 'icon-liebiaoxunhuan';
			}
		}
	},
	components: {
		musicdial
	},
	computed: {
		runimg() {
			if (this.$store.state.audiostate == 'stop') {
				return 'paused';
			} else {
				return 'running';
			}
		},
		imgsrc() {
			if (this.$store.state.song == '') {
				return;
			}
			return this.$store.state.song.al.picUrl;
		},
		backurl() {
			if (this.$store.state.song == '') {
				return `url(${newimg('/img/12.6568f576.jpg', this)})`;
			}
			return `url(${newimg(this.$store.state.song.al.picUrl, this)})`;
		},
		song() {
			if (this.$store.state.song == '') {
				return {
					name: '未播放歌曲',
					singer: ''
				};
			}
			return {
				name: this.$store.state.song.al.name,
				singer: this.$store.state.song.ar[0].name
			};
		},
		songTime() {
			var num = this.$store.state.songtime;
			if (typeof this.$store.state.songtime == 'number') {
				this.$store.state.songTime = num;
				var f = num / 60,
					s = num % 60;
				f = Math.floor(f);
				s = Math.ceil(s);
				if (f < 10) {
					f = '0' + f;
				}
				if (s < 10) {
					s = '0' + s;
				}
				num = `${f}:${s}`;
			}
			return num;
		},
		gettime() {
			return this.$store.state.time;
		},
		percentage() {
			if(this.$store.state.percent === Infinity || `${this.$store.state.percent}` === `NaN`){
				return 0;
			}
			return this.$store.state.percent;
		},
		state() {
			if (this.$store.state.audiostate == 'stop') {
				this.bofang = 'icon-bofang';
			} else if (this.$store.state.audiostate == 'play') {
				this.bofang = 'icon-zanting';
			}
			return this.$store.state.audiostate;
		},
		zhuangtai() {
			return this.xunhuan;
		}
	}
};
</script>

<style lang="less">
@import url('../css/music.less');
</style>
