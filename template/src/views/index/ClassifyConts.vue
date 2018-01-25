<template>
	<ul class="cat_list">
		<li class="cat-item">
			<ul class="u_list">
				<li v-for="item in cats.children">
					<router-link :to = "{ path: '/carSearch/classify/'+item.categoryId}" class="cinema_item_link clearfix">
						<img v-lazy="item.goodsTypeImgUrl">
						<p class="name">{{item.categoryName}}</p>
					</router-link>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		mounted() {
			for(var i=0; i < this.cats.length;i++){
				if(this.cats[i].goodsTypeId == this.secondLevelID){
					document.querySelectorAll('.cat-item')[i].scrollIntoView();
					break;
				}
			}
		},
		props:['cats','secondLevelID']
	}
</script>
<style lang="less" scoped>
	.cat_list{
		.cat-item{
			.title{
				margin-top:0.4rem;
				margin-bottom: 0.266667rem;
				i{
					float: left;
					width:0.08rem;
					height: 0.4rem;
					background: #FF5C5C;
					display: block;
				}
		    span{
		    	display: block;
		    	height: 0.4rem;
		    	line-height: 0.4rem;
		    	margin-left: 0.266667rem;
		    	font-size: 0.373333rem;
		    	color:#333;
		    }
			}
			.u_list{
				margin-top:0.266667rem;
   				overflow: hidden;
			    padding: 0 0.04rem;
		        margin-bottom: -0.4rem;
   				li{
				    float: left;
				    width: 2.266667rem;
				    margin-right:0.213333rem;
				    overflow: hidden;
				    a{	
				    	img{
				    		width:2.266667rem;
				    		height: 2.266667rem;
				    	}
			    	  display: block;
    					width: 100%;
    					.name{
    						/*height: 1.2rem;*/
    						height: 0.8rem;
    						line-height: 0.4rem;
    						width: 2.266667rem;
    						margin-top:0.266667rem;
    						display: -webkit-box;
    						-webkit-line-clamp: 2;
    						-webkit-box-orient: vertical;
    						word-break: break-all;
    						
    						font-size: 0.346667rem;
    						color: #666;
						    text-align: center;
						    overflow: hidden;
						    margin-bottom: 0.4rem;
						    /*text-overflow:ellipsis;
						    white-space: nowrap;*/
    					}
				    }

   				}
			}
		}
	}
</style>