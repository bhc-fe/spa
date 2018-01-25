<template>
	<div class="adver-img">
		<a :href="catImg.cateTargerUrl" class="">
			<img v-lazy="catImg.adverImg">
		</a>
	</div>
</template>
<script>
	export default{
		props:['catImg']
	}
</script>
<style lang="less" scoped>
	.adver-img{
		width:7.333333rem;
		height: 2.133333rem;
		overflow: hidden;
		/*background-color: #ccffff;*/
		img{
			width:7.333333rem;
			height: 2.133333rem;
		}
	}
</style>