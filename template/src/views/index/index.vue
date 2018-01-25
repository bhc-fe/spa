<template>
	<div class="classify-container">
		<div class="classify-box" v-show="!noWifiFlag">
			<div class="first-nav">
				<ul class="first-nav-list">
					<li class="first-nav-item" v-for="(item,index) in dataSource" :class="{'active':item.isSelected}">
						<template v-if="index===dataSource.length-1">
							<a class="border-none" href="javascript:void(0);" @click="show(index)">{{item.categoryName}}</a>
						</template>
						<template v-else>
							<a href="javascript:void(0);" @click="show(index)">{{item.categoryName}}</a>
						</template>
					</li>
				</ul>
			</div>
			<div class="first-main">
				<ClassifyAdver :catImg="secondItem"></ClassifyAdver>
				<ClassifyConts :cats="secondItem" :secondLevelID="secondLevelID"></ClassifyConts>
			</div>
		</div>

		<div class="no-wifi" v-show="noWifiFlag">
			<img src="//gfs8.gomein.net.cn/T17nWvB4hg1RCvBVdK">
			<span>亲，网络异常，请检查网络连接！</span>
			<div class="reload" @click="reloadClick">重新加载</div>
		</div>

	</div>
</template>
<script>
	import ClassifyAdver from './ClassifyAdver'
	import ClassifyConts from './ClassifyConts'
	import indexApi from '@/api/indexApi'
	import ConfigUrl from '@/util/configUrl'
	const apiUrl = ConfigUrl.getApiUrl();
	export default {
		data() {
			return {
				dataSource: [],
				secondItem: [],
				secondLevelID: "",
				adverObj: {},
				isLoaded: false,
				noWifiFlag: false
			}
		},
		components: {
			ClassifyAdver,
			ClassifyConts
		},
		created() {
			this.init();
		},
		methods: {
			init: function() {
				indexApi.getCateInfo().then((res) => {
					let data = (typeof(res) === 'string' ? JSON.parse(res) : res);
					if(data.status == 200) {
						data.data.forEach(item => {
							item.isSelected = false;
							item.adverImg = {
								src: item.categoryImgUrl,
								error: apiUrl.BITMAPIMG,
								loading: apiUrl.BITMAPIMG
							}
						})
						this.dataSource = data.data;
						this.dataSource[0].isSelected = true;
						this.show(0);
						this.isLoaded = true;
					} else {
						this.noWifiFlag = true;
					}
				}).catch((error) => {
					this.noWifiFlag = true;
					console.log(error)
				})
			},
			show: function(index) {
				this.dataSource.forEach(item => item.isSelected = false)
				this.dataSource[index].isSelected = true;
				this.secondItem = this.dataSource[index];
				if(this.secondItem.children !== undefined) {
					this.secondItem.children.forEach(item => {
						if((typeof item.categoryImgUrl) == "object") return;
						item.goodsTypeImgUrl = {
							src: item.categoryImgUrl,
							error: apiUrl.BITMAPIMG,
							loading: apiUrl.BITMAPIMG
						}
					})
				}
			},
			reloadClick: function() {
				window.location.reload()
			}
		}
	}
</script>
<style lang="less" scoped>
	.classify-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0rem;
		width: 10rem;
		margin: 0 auto;
		.classify-box {
			position: absolute;
			/*top: 1.333333rem;*/
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-top: 1px solid #ddd;
			box-sizing: border-box;
			.first-nav {
				/*width: 2.266667rem;*/
				width: 2.133333rem;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				background-color: #f6f6f6;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				overflow: auto;
				overflow-scrolling: touch;
				-webkit-overflow-scrolling: touch;
				.first-nav-list {
					min-height: 100%;
					border-right: 1px solid #ddd;
					.first-nav-item {
						line-height: 1.333333rem;
						/*border-bottom: 1px solid #ddd;*/
						box-sizing: border-box;
						color: #000;
						text-align: center;
						background: #f6f6f6;
						font-size: .346667rem;
						a {
							display: block;
							margin: 0 0.133333rem;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							border-bottom: 1px solid #ddd;
						}
						.border-none {
							border: none;
						}
					}
					.active {
						border-left: 4px solid #ff5c5c;
						background-color: #fff;
						padding-left: 0;
						z-index: 1;
						position: relative;
						margin-right: -1px;
						a {
							color: #FF5C5C;
						}
					}
				}
				&::-webkit-scrollbar {
					display: none;
				}
			}
			.first-main {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				overflow-y: auto;
				overflow-x: hidden;
				overflow-scrolling: touch;
				-webkit-overflow-scrolling: touch;
				padding-left: 0.266667rem;
				/*padding: 0 0  1.333333rem 0.266667rem;*/
				word-wrap: break-word;
				word-break: break-all;
				width: 7.866667rem;
				background: #fff;
				box-sizing: border-box;
				&::-webkit-scrollbar {
					display: none;
				}
			}
		}
		.no-wifi {
			position: absolute;
			width: 10rem;
			top: 0;
			left: 0;
			bottom: 0;
			background-color: #F2F2F2;
			img {
				width: 4.0rem;
				height: 3.333333rem;
				margin: 0 auto;
				margin-top: 3.2rem;
			}
			span {
				width: 6rem;
				display: block;
				text-align: center;
				font-size: 0.346667rem;
				color: #999;
				margin: 0 auto;
				margin-top: 0.533333rem;
				padding-bottom: 0.8rem;
			}
			.reload {
				width: 2.266667rem;
				height: 0.746667rem;
				line-height: 0.746667rem;
				margin: 0 auto;
				text-align: center;
				font-size: 0.32rem;
				color: #666;
				border-radius: 0.08rem;
				border: 1px solid #999;
			}
		}
	}
</style>