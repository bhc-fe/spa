function ConfigUrl(){
	// uat环境
	const UAT_PREFIX_URL = {
		CMS_SERVICE_URL:"//carcmsapi.atguat.com.cn", //lijianbing
	}

	// live环境
	const LIVE_PREFIX_URL = {
		CMS_SERVICE_URL:"//carcmsapi.gome.com.cn", //lijianbing
	}
	// 后缀
	const Suffix_URL = {
		BITMAPIMG:'//gfs8.gomein.net.cn/T1ZIdvBgVb1RCvBVdK',
		CLASSIFY_URL:"/recommendCateInfo/getCategory"
	}
	
	this.ApiUrl = null;
	this.getApiUrl = function(){
		const path = window.location.href;
		return this.ApiUrl === null ? (path.indexOf('uat') !== -1||path.indexOf('http://localhost')>-1 ? Object.assign(Suffix_URL,UAT_PREFIX_URL) : Object.assign(Suffix_URL,LIVE_PREFIX_URL)) : this.configUrl;
	}
}
export default new ConfigUrl();

