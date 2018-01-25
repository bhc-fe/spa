<template>
	<div id="app">
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
export default {
		name: 'app',
		mounted(){/*
			this.gomeAppUtil.isApp && this.gomeAppUtil.version<90 && this.gomeAppUtil.addReadyCallback(function(){
				this.bridge.setShareInfo({
		            shareDesc: "我在国美汽车发现了超值活动，速来围观！",
		            link:window.location.href.indexOf("uat")==-1?"https://car.m.gome.com.cn?cartype=1":"http://car.m.atguat.com.cn?cartype=1",
		            imageUrl:"https://gfs9.gomein.net.cn/T1AG_vBCZQ1RCvBVdK",
		            title:"国美汽车"
		        })
			})
			this.gomeAppUtil.isApp && this.gomeAppUtil.version>=90 && this.gomeAppUtil.addReadyCallback(function(){
				var param = {
			        menus : {
			            rightMenus:[
		                    {
		                        type:'share',
		                        title:'分享',
		                        icon:'file://share',
		                        shareInfo:{
		                            title:"国美汽车",
		                            shareDesc:'我在国美汽车发现了超值活动，速来围观！',
		                            shareImageUrl:"https://gfs9.gomein.net.cn/T1AG_vBCZQ1RCvBVdK",
		                            shareUrl:window.location.href.indexOf("uat")==-1?"https://car.m.gome.com.cn?cartype=1":"http://car.m.atguat.com.cn?cartype=1",
		                            platform:['WeiBo','Wechat','WechatMoments','QQ','QZone']
		                        }
		                    }
		                ]
			        }
	    		}
			    this.bridge.setHeadBar(function(data){
			        console.log(data)
			    },function(err){
			        console.log(err)
			    },param)
			})*/
		}
}
</script>

<style>
	@import './assets/css/base.css';
</style>