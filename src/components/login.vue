<template>
	<div class="log-wrapper">
		<p class="logo">
			<img src="../assets/timg.jpg" alt="">
		</p>
		
		<div class="login">
			<input type="number" placeholder="请输入手机号" v-model="phone">
			<input type="password" placeholder="请输入密码" v-model="password">
			<el-button :center="true" :plain="true" @click="gologin" >一键登录</el-button>
			<el-button :center="true" :plain="true" @click="nologin" >立即体验</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				phone: '',
				password: ''
			}
		},
		methods:{
			gologin(){
				var ouser = undefined
				if(sessionStorage.user){
					ouser = JSON.parse(sessionStorage.user).config.data
				}
				if(ouser && (ouser.indexOf(this.phone) != -1) && (ouser.indexOf(this.password) != -1)){
					this.$store.commit('login',JSON.parse(sessionStorage.user))
					this.$store.commit('userdetail',JSON.parse(sessionStorage.detail))
					this.$message({
						type: 'success',
						message: '登录成功！',
						duration: 2000
					})
					this.$router.go(-1)
				}else{
					if(this.phone == '' || this.password == ''){
						this.$message('请填写完整手机或密码！')
						return
					}
					var a = this.$loading({
						text: "登录中...",
						target: '.log-wrapper'
					})
					this.$axios.post('http://music.happydouble.xyz/login/cellphone',{
						phone: this.phone,
						password: this.password
					}).then((data) => {
							this.$axios.get(`http://music.happydouble.xyz/user/detail?uid=${data.data.account.id}`).then((yes) => {
							this.$store.commit('userdetail',yes)
							sessionStorage.detail = JSON.stringify(yes)//用户详细信息
						},(err) => {
							console.log(err,'获取失败')
						})
						a.close()
						this.$store.commit('login',data)
						
						sessionStorage.user = JSON.stringify(data)//用户登录信息
						
						this.$message({
							type: 'success',
							message: '登录成功！',
							duration: 2000
						})
						this.$router.go(-1)
					}).catch((data) => {
						a.close()
						this.$message({
										type: 'error',
										message: '登录失败！请检查手机号或密码。'
						})
					})
				}
			},
			nologin(){
				this.$message({
						message: '未登录！',
						duration: 2000
					})
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="less">
	@import  url("../css/login.less");
</style>
