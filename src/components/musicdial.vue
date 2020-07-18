<template>
	<div class="dial imgrun" :style="{animationPlayState: imgstop}">
		<img :style="{height: `${size}`, width: `${size}`}" :src="imgsrc" alt="">
	</div>
</template>

<script>
	export default {
		props: {
			size: {
				type: String,
				default: '100px'
			},
			imgsrc: {
				type: String,
				default: 'https://images.pexels.com/photos/4297441/pexels-photo-4297441.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			imgstop: {
				type: String,
				default: 'paused'  
			}
		}
	}
</script>

<style>
	.dial{
		width: 100%;
		height: 100%;
	}
	.dial img {
		border-radius: 50%;
	}
	.imgrun{
		animation: imgrun 20s linear infinite;
	}
	@keyframes imgrun{
		from{
			transform: rotate3d(0,0,0,0deg);
		}
		to{
			transform: rotate3d(0,0,1,360deg);
		}
	}
</style>
