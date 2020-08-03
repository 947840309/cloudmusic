<template>
	<div class="me-wrapper">
		<div class="user">
			<template>
				<div v-if="loginshow" class="nologin">
					<p class="iconfont icon-NMStubiao-"></p>
					<span>登录立享手机电脑多端同步</span>
					<router-link tag="span" :to="{ name: 'login' }">立即登录</router-link>
				</div>
				<div v-else class="login">
					<img :src="user.data.profile.avatarUrl" alt="" />
					<div>
						<h4>{{ user.data.profile.nickname }}</h4>
						<span>LV.{{ user.data.level }}</span>
					</div>
					<span>进入我的VIP ></span>
				</div>
			</template>
			<ul class="me-icon">
				<li v-for="itme in meicon" :key="">
					<span :class="itme.icon"></span>
					<span>{{ itme.text }}</span>
				</li>
			</ul>
		</div>
		<div class="mysongs">
			<p class="tlite">
				<span>我的音乐</span>
				<span>></span>
			</p>
			<ul>
				<li @click="getsonglist('like')">
					<div>
						<span class="iconfont icon-xihuan"></span>
						<span>我喜欢的音乐</span>
					</div>
					<p><span class="like">心动模式</span></p>
				</li>
				<li @click="getsonglist('sr')">
					<div>
						<span class="iconfont icon-icon--"></span>
						<span>私人FM</span>
					</div>
					<p><span>懂你的推荐</span></p>
				</li>
				<li @click="getsonglist('run')">
					<div>
						<span class="iconfont icon-paobu"></span>
						<span>跑步FM</span>
					</div>
				</li>
			</ul>
		</div>

		<template v-if="!loginshow" >
			<div class="list-wrapper">
				<div class="change">
					<p @click="listchange" :class="{ bai: changelist }">创建歌单</p>
					<p @click="listchange" :class="{ bai: !changelist }">收藏歌单</p>
				</div>
				<div class="osonglist">
					<ul v-show="changelist">
						<li v-for="itme in mysongarr" @click="getsonglist(itme)">
							<img :src="itme.coverImgUrl+'?param=200y200'" alt="" />
							<p>
								<span>{{itme.name}}</span>
								<span>{{itme.trackCount}}首</span>
							</p>
						</li>
					</ul>
					<ul v-show="!changelist">
						<li v-for="itme in nomysongarr" @click="getsonglist(itme)">
							<img :src="itme.coverImgUrl+'?param=200y200'" alt="" />
							<p>
								<span>{{itme.name}}</span>
								<span>{{itme.trackCount}}首</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</template>
		<template>
			<el-drawer :show-close='false' direction='btt' :visible.sync='showlist' :modal='false' :wrapperClosable='false' size='100%' :withHeader='false'>
				<songlist :songlistid="listid" :listname="listname" :description="description" :songbg="songbg" :playCount="playCount" :songnumber="songnumber"></songlist>
			</el-drawer>
		</template>
		<br>
		<br>
	</div>
</template>

<script>
import songlist from './songlist.vue'

export default {
	data() {
		return {
			meicon: [
				{
					icon: 'icon-yinyue iconfont',
					text: '本地音乐'
				},
				{
					icon: 'icon-Download_icon iconfont',
					text: '下载管理'
				},
				{
					icon: 'icon-diantai iconfont',
					text: '我的电台'
				},
				{
					icon: 'icon-shoucang iconfont',
					text: '我的收藏'
				},
				{
					icon: 'icon-zhuanjiguangpan iconfont',
					text: '关注新歌'
				}
			],
			user: '',
			userid: '',
			changelist: true,
			listid: '',
			listname: '',
			description: '',
			songnumber: '',
			songbg: '',
			playCount: ''
		};
	},
	computed: {
		loginshow() {
			this.user = this.$store.state.detail;
			if(this.user == ''){
				this.user = {
					data : {
						profile : {
							avatarUrl : '#',
							nickname : '请稍后'
						},
					level : 0
					}
				}
			}
			this.userid = this.$store.state.user == '' ? '' : this.$store.state.user.data.account.id;
			if (this.$store.state.user != '') {
				return false;
			} else {
				return true;
			}
		},
		mysongarr() {
			var arr = this.$store.state.usersonglist.slice(1) || []
			arr = arr.filter((itme) => {
				if(itme.userId == this.userid) return true;
				return false
			})
			return arr
		},
		nomysongarr(){
			var arr = this.$store.state.usersonglist.slice(1) || []
			arr = arr.filter((itme) => {
				if(itme.userId != this.userid) return true;
				return false
			})
			return arr
		},
		showlist() {
			return this.$store.state.showlist
		}
	},
	methods: {
		getsonglist(value) {
			if(value == 'sr'){
				if(this.$store.state.opensr) return;
				this.$store.commit('changesr')
			}else{
				if(value == 'like'){
					if(this.userid == ''){
						this.$message({
							message: '该功能需要登录！！',
							duration: 2000
						})
						return
					}
					this.listid = this.$store.state.usersonglist[0].id
					this.songnumber = this.$store.state.usersonglist[0].trackCount
					this.songbg = this.$store.state.usersonglist[0].coverImgUrl + '?param=200y200'
					this.playCount = this.$store.state.usersonglist[0].playCount
				}else{
					this.listid = value.id
					this.songnumber = value.trackCount
					this.songbg = value.coverImgUrl + '?param=200y200'
					this.playCount = value.playCount
				}
				this.listname = value.name
				this.description = value.description
				this.$store.commit('changelist')
			}
		},
		listchange() {
			this.changelist = !this.changelist;
		}
	},
	components:{
		songlist
	}
};
</script>

<style lang="less">
@import url('../css/me.less');
</style>
